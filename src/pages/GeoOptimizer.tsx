import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ingredients, geoKeywordSuggestions } from "@/data/mockData";
import { Search, Lightbulb, ArrowRight, Sparkles } from "lucide-react";

const GeoOptimizer = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof ingredients[0]["consumerQueries"]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    const allQueries = ingredients.flatMap((i) =>
      i.consumerQueries.map((q) => ({ ...q, ingredientName: i.name }))
    );
    const results = allQueries
      .filter((q) => q.query.includes(query) || query.includes(q.query.slice(0, 3)))
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
    setSearchResults(results.length > 0 ? results : allQueries.slice(0, 3));
    setSearched(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">GEO 搜索优化工具</h1>
        <p className="text-muted-foreground mt-1">优化原料在 AI 生成搜索引擎中的可见度</p>
      </div>

      {/* Semantic Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Search className="h-4 w-4" />
            语义映射查询
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">输入消费者可能提出的健康问题，查看匹配的原料证据</p>
          <div className="flex gap-2">
            <Input
              placeholder="例如：孩子记性不好补什么？"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-1" />
              查询
            </Button>
          </div>

          {/* Quick Suggestions */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {["孩子记性不好补什么？", "怎么提高免疫力？", "吃什么能降血糖？"].map((q) => (
              <Button
                key={q}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => { setQuery(q); }}
              >
                {q}
              </Button>
            ))}
          </div>

          {searched && searchResults.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-semibold">匹配结果</h3>
              {searchResults.map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                  <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold shrink-0">
                    {r.relevanceScore}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{r.query}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <p className="text-xs text-muted-foreground">{r.matchedEvidence}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">
                    相关度 {r.relevanceScore}%
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Keyword Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI 关键词优化建议
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>关键词</TableHead>
                <TableHead>竞争难度</TableHead>
                <TableHead>搜索热度</TableHead>
                <TableHead>优化建议</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {geoKeywordSuggestions.map((kw, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{kw.keyword}</TableCell>
                  <TableCell>
                    <Badge variant={kw.difficulty === "低" ? "secondary" : kw.difficulty === "中" ? "outline" : "destructive"} className="text-xs">
                      {kw.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">{kw.volume}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs">
                    <div className="flex items-start gap-1">
                      <Lightbulb className="h-3 w-3 mt-0.5 text-primary shrink-0" />
                      <span>{kw.recommendation}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Query-Evidence Mapping */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">消费者查询 — 原料证据映射表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>消费者常见问题</TableHead>
                <TableHead>匹配原料</TableHead>
                <TableHead>关联证据</TableHead>
                <TableHead>相关度</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredients.flatMap((ing) =>
                ing.consumerQueries.map((q, qi) => (
                  <TableRow key={`${ing.id}-${qi}`}>
                    <TableCell className="font-medium">{q.query}</TableCell>
                    <TableCell><Badge variant="outline">{ing.code}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{q.matchedEvidence}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${q.relevanceScore}%` }} />
                        </div>
                        <span className="text-xs">{q.relevanceScore}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeoOptimizer;

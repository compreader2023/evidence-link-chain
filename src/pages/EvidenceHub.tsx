import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ingredients, type Study } from "@/data/mockData";
import { FileText, Download, ExternalLink, FlaskConical, BookOpen } from "lucide-react";

const EvidenceHub = () => {
  const [selectedIngredient, setSelectedIngredient] = useState(ingredients[0].id);
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);

  const ingredient = ingredients.find((i) => i.id === selectedIngredient)!;

  const handleExport = useCallback((target: string) => {
    alert(`已生成面向${target}的「${ingredient.name}」循证价值白皮书（模拟导出）`);
  }, [ingredient.name]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">交互式循证链条中心</h1>
          <p className="text-muted-foreground mt-1">可视化功能声称与科学证据的关联</p>
        </div>
        <Select value={selectedIngredient} onValueChange={setSelectedIngredient}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ingredients.map((i) => (
              <SelectItem key={i.id} value={i.id}>{i.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Evidence Chain Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">循证链条图谱</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-6 py-4">
            {/* Claim Node */}
            <div className="bg-primary text-primary-foreground rounded-xl px-6 py-3 shadow-lg text-center">
              <p className="text-xs opacity-80">功能声称</p>
              <p className="font-bold text-lg">{ingredient.claim}</p>
            </div>

            {/* Connector */}
            <div className="w-0.5 h-8 bg-primary/30" />

            {/* Ingredient Node */}
            <div className="border-2 border-primary rounded-xl px-6 py-3 text-center">
              <p className="text-xs text-muted-foreground">核心原料</p>
              <p className="font-bold text-primary">{ingredient.name}</p>
              <p className="text-xs text-muted-foreground mt-1">循证完整度 {ingredient.evidenceScore}%</p>
            </div>

            {/* Connectors to evidence */}
            <div className="flex items-center gap-2">
              {ingredient.studies.map((_, i) => (
                <div key={i} className="w-0.5 h-6 bg-primary/20" />
              ))}
            </div>

            {/* Evidence Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {ingredient.studies.map((study) => (
                <button
                  key={study.id}
                  onClick={() => setSelectedStudy(study)}
                  className="text-left border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all group cursor-pointer bg-card"
                >
                  <div className="flex items-start gap-2 mb-2">
                    {study.type === '临床研究' ? (
                      <FlaskConical className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    ) : (
                      <BookOpen className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    )}
                    <Badge variant="outline" className="text-xs shrink-0">{study.type}</Badge>
                  </div>
                  <p className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    {study.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">{study.journal} · {study.year}</p>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4" />
            报告生成器
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">一键导出「{ingredient.name}」循证价值白皮书</p>
          <div className="flex gap-3">
            <Button onClick={() => handleExport("品牌商(B)")}>
              <Download className="h-4 w-4 mr-1" />
              品牌商版白皮书
            </Button>
            <Button variant="outline" onClick={() => handleExport("代理商(R)")}>
              <Download className="h-4 w-4 mr-1" />
              代理商版白皮书
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Side Panel */}
      <Sheet open={!!selectedStudy} onOpenChange={() => setSelectedStudy(null)}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          {selectedStudy && (
            <>
              <SheetHeader>
                <SheetTitle className="text-left">{selectedStudy.title}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="flex gap-2 flex-wrap">
                  <Badge>{selectedStudy.type}</Badge>
                  <Badge variant="outline">{selectedStudy.year}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">发表期刊</p>
                  <p className="text-sm">{selectedStudy.journal}</p>
                </div>
                {selectedStudy.sampleSize && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">样本量</p>
                    <p className="text-sm">{selectedStudy.sampleSize} 名受试者</p>
                  </div>
                )}
                {selectedStudy.purity && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">纯度数据</p>
                    <p className="text-sm">{selectedStudy.purity}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-muted-foreground">研究摘要</p>
                  <p className="text-sm leading-relaxed">{selectedStudy.summary}</p>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <a href={selectedStudy.sourceUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    查看原文链接
                  </a>
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EvidenceHub;

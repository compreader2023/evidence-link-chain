import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { digitalAssets, ingredients } from "@/data/mockData";
import { Search, FileText, Award, TestTube, BookOpen, File } from "lucide-react";

const typeIcons: Record<string, React.ReactNode> = {
  '学术论文': <BookOpen className="h-4 w-4" />,
  '临床报告': <TestTube className="h-4 w-4" />,
  '专利证书': <Award className="h-4 w-4" />,
  '检测报告': <FileText className="h-4 w-4" />,
  '白皮书': <File className="h-4 w-4" />,
};

const Assets = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [ingredientFilter, setIngredientFilter] = useState("all");

  const filtered = digitalAssets.filter((a) => {
    const matchSearch = !search || a.title.includes(search) || a.tags.some((t) => t.includes(search));
    const matchType = typeFilter === "all" || a.type === typeFilter;
    const matchIngredient = ingredientFilter === "all" || a.ingredientId === ingredientFilter;
    return matchSearch && matchType && matchIngredient;
  });

  const types = [...new Set(digitalAssets.map((a) => a.type))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">数字资产库</h1>
        <p className="text-muted-foreground mt-1">管理学术论文、临床报告、专利证书等数字资产</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {types.map((type) => (
          <Card key={type} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setTypeFilter(type)}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="text-primary">{typeIcons[type]}</div>
              <div>
                <p className="text-lg font-bold">{digitalAssets.filter((a) => a.type === type).length}</p>
                <p className="text-xs text-muted-foreground">{type}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">资产筛选</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索资产名称或标签..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="资产类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                {types.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={ingredientFilter} onValueChange={setIngredientFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="原料筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部原料</SelectItem>
                {ingredients.map((i) => (
                  <SelectItem key={i.id} value={i.id}>{i.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>资产名称</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>关联原料</TableHead>
                <TableHead>日期</TableHead>
                <TableHead>标签</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((asset) => {
                const ing = ingredients.find((i) => i.id === asset.ingredientId);
                return (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <span className="text-primary">{typeIcons[asset.type]}</span>
                        {asset.title}
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{asset.type}</Badge></TableCell>
                    <TableCell><Badge variant="secondary" className="text-xs">{ing?.code}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{asset.date}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {asset.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    未找到匹配的资产
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Assets;

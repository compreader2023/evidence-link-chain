import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ingredients } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Shield, Globe, Users, TrendingUp } from "lucide-react";

const geoData = ingredients.map((i) => ({
  name: i.code,
  score: i.geoScore,
}));

const radarData = ingredients.map((i) => ({
  ingredient: i.code,
  循证完整度: i.evidenceScore,
  GEO覆盖率: i.geoScore,
  合作引用: Math.min(i.partnerCitations * 1.5, 100),
}));

const Index = () => {
  const avgEvidence = Math.round(ingredients.reduce((s, i) => s + i.evidenceScore, 0) / ingredients.length);
  const avgGeo = Math.round(ingredients.reduce((s, i) => s + i.geoScore, 0) / ingredients.length);
  const totalCitations = ingredients.reduce((s, i) => s + i.partnerCitations, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">厂商管理后台</h1>
        <p className="text-muted-foreground mt-1">营养原料循证价值总览</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">循证链条完整度</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgEvidence}%</div>
            <Progress value={avgEvidence} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">GEO 覆盖率</CardTitle>
            <Globe className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgGeo}%</div>
            <Progress value={avgGeo} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">合作伙伴引用数</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCitations}</div>
            <p className="text-xs text-muted-foreground mt-1">共 {ingredients.length} 款原料</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">数字资产总量</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground mt-1">论文·报告·专利·白皮书</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">GEO Readiness 评分</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={geoData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis domain={[0, 100]} fontSize={12} />
                <Tooltip />
                <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">原料综合评估</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="ingredient" fontSize={12} />
                <PolarRadiusAxis domain={[0, 100]} fontSize={10} />
                <Radar name="循证完整度" dataKey="循证完整度" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.2} />
                <Radar name="GEO覆盖率" dataKey="GEO覆盖率" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.2} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Ingredient Cards */}
      <div>
        <h2 className="text-lg font-semibold mb-3">核心原料概览</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ingredients.map((ing) => (
            <Card key={ing.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{ing.name}</CardTitle>
                  <Badge variant="secondary">{ing.code}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">{ing.claim}</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">循证完整度</span>
                    <span className="font-medium">{ing.evidenceScore}%</span>
                  </div>
                  <Progress value={ing.evidenceScore} className="h-1.5" />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GEO 评分</span>
                    <span className="font-medium">{ing.geoScore}%</span>
                  </div>
                  <Progress value={ing.geoScore} className="h-1.5" />
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground pt-1">
                  <span>{ing.studies.length} 项研究</span>
                  <span>{ing.patents.length} 项专利</span>
                  <span>{ing.partnerCitations} 次引用</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;

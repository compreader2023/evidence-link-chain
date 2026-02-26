import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ingredients } from "@/data/mockData";
import { Shield, Award, ExternalLink, ChevronRight, FlaskConical, BookOpen } from "lucide-react";

const TrustCard = () => {
  const { id } = useParams<{ id: string }>();
  const ingredient = ingredients.find((i) => i.id === id);

  if (!ingredient) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">未找到该原料信息</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-4 pb-8">
      {/* Header - Dual Brand */}
      <div className="bg-primary text-primary-foreground rounded-2xl p-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="bg-primary-foreground/20 rounded-lg px-3 py-1">
            <span className="text-xs font-medium">原料品牌</span>
          </div>
          <span className="text-primary-foreground/40">×</span>
          <div className="bg-primary-foreground/20 rounded-lg px-3 py-1">
            <span className="text-xs font-medium">成品品牌</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold">{ingredient.name}</h1>
        <p className="text-primary-foreground/80 mt-1">{ingredient.claim}</p>
      </div>

      {/* Trust Badge */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">信任认证</h2>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xl font-bold text-primary">{ingredient.studies.length}</p>
              <p className="text-xs text-muted-foreground">临床研究</p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xl font-bold text-primary">{ingredient.patents.length}</p>
              <p className="text-xs text-muted-foreground">专利保护</p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xl font-bold text-primary">{ingredient.events.length}</p>
              <p className="text-xs text-muted-foreground">学术活动</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Studies */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <FlaskConical className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">核心研究</h2>
          </div>
          <div className="space-y-3">
            {ingredient.studies.map((study) => (
              <div key={study.id} className="border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">{study.type}</Badge>
                  <span className="text-xs text-muted-foreground">{study.year}</span>
                </div>
                <p className="text-sm font-medium">{study.title}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{study.summary}</p>
                {study.sampleSize && (
                  <p className="text-xs text-primary mt-1">样本量: {study.sampleSize}人</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Academic Events */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Award className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">学术活动记录</h2>
          </div>
          <div className="space-y-2">
            {ingredient.events.map((event) => (
              <div key={event.id} className="flex items-start gap-3 py-2">
                <div className="w-1 h-full bg-primary rounded-full shrink-0 mt-1" style={{ minHeight: '2rem' }} />
                <div>
                  <p className="text-sm font-medium">{event.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">{event.type}</Badge>
                    <span className="text-xs text-muted-foreground">{event.organization}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Evidence Tracing Button */}
      <Button className="w-full h-12 text-base" asChild>
        <Link to="/evidence-hub">
          <BookOpen className="h-5 w-5 mr-2" />
          查看完整循证链条
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </Button>

      {/* Other Ingredients */}
      <Separator />
      <div>
        <p className="text-sm text-muted-foreground mb-2">查看其他原料</p>
        <div className="flex gap-2">
          {ingredients.filter((i) => i.id !== id).map((i) => (
            <Button key={i.id} variant="outline" size="sm" asChild>
              <Link to={`/trust-card/${i.id}`}>{i.code}</Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustCard;

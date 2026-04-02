export interface CoreWebVitals {
  lcp: MetricValue;
  fid: MetricValue;
  cls: MetricValue;
  fcp: MetricValue;
  si: MetricValue;
  tbt: MetricValue;
  tti: MetricValue;
}

export interface MetricValue {
  value: number;
  displayValue: string;
  score: number;
}

export interface CategoryScore {
  score: number;
  title: string;
}

export interface AuditIssue {
  id: string;
  title: string;
  description: string;
  score: number | null;
  displayValue?: string;
}

export interface AnalysisResult {
  url: string;
  fetchTime: string;
  categories: {
    performance: CategoryScore;
    seo: CategoryScore;
    accessibility: CategoryScore;
    bestPractices: CategoryScore;
  };
  coreWebVitals: CoreWebVitals;
  issues: AuditIssue[];
  recommendations: AuditIssue[];
}

export interface AnalysisError {
  error: string;
  details?: string;
}

export type AnalysisResponse = AnalysisResult | AnalysisError;

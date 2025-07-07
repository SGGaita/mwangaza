'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Paper,
  LinearProgress,
  Breadcrumbs,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  IconButton,
  Tooltip,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Analytics,
  TrendingUp,
  TrendingDown,
  Assessment,
  BarChart,
  PieChart,
  Timeline,
  LocationOn,
  CalendarToday,
  People,
  Warning,
  Error,
  Info,
  CheckCircle,
  Home,
  Download,
  Print,
  Share,
  Refresh,
  Visibility,
  Map,
  DateRange,
  Category,
  Place,
  Schedule,
  Group,
  Security,
  Gavel,
  Search,
  Shield,
  Emergency,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ComposedChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [timeRange, setTimeRange] = useState('1year');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [realTimeUpdate, setRealTimeUpdate] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    if (realTimeUpdate) {
      const interval = setInterval(() => {
        setLastUpdated(new Date());
      }, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [realTimeUpdate]);

  // Mock data for analytics
  const overallStats = {
    totalCases: 1247,
    activeCases: 834,
    resolvedCases: 289,
    criticalCases: 124,
    monthlyChange: {
      total: +12.5,
      active: +8.3,
      resolved: +15.7,
      critical: -2.1
    }
  };

  const categoryData = [
    { name: 'Enforced Disappearances', count: 456, percentage: 36.6, trend: +5.2, color: '#ff9800', value: 456 },
    { name: 'Extrajudicial Killings', count: 342, percentage: 27.4, trend: -3.1, color: '#f44336', value: 342 },
    { name: 'Abductions', count: 289, percentage: 23.2, trend: +7.8, color: '#2196f3', value: 289 },
    { name: 'Torture', count: 160, percentage: 12.8, trend: +2.4, color: '#9c27b0', value: 160 }
  ];

  const regionData = [
    { name: 'Nairobi', cases: 278, population: 4700000, rate: 5.9, trend: +8.5 },
    { name: 'Kisumu', cases: 156, population: 1155000, rate: 13.5, trend: +12.1 },
    { name: 'Nakuru', cases: 143, population: 2162000, rate: 6.6, trend: -2.3 },
    { name: 'Mombasa', cases: 134, population: 1208000, rate: 11.1, trend: +5.7 },
    { name: 'Uasin Gishu', cases: 98, population: 1163000, rate: 8.4, trend: +15.2 },
    { name: 'Kiambu', cases: 87, population: 2417000, rate: 3.6, trend: -1.8 },
    { name: 'Machakos', cases: 76, population: 1421000, rate: 5.3, trend: +3.4 },
    { name: 'Meru', cases: 68, population: 1545000, rate: 4.4, trend: +9.8 }
  ];

  const timelineData = [
    { month: 'Jan', total: 89, disappearances: 32, killings: 28, abductions: 29 },
    { month: 'Feb', total: 76, disappearances: 28, killings: 24, abductions: 24 },
    { month: 'Mar', total: 102, disappearances: 38, killings: 31, abductions: 33 },
    { month: 'Apr', total: 94, disappearances: 35, killings: 29, abductions: 30 },
    { month: 'May', total: 87, disappearances: 31, killings: 27, abductions: 29 },
    { month: 'Jun', total: 112, disappearances: 42, killings: 35, abductions: 35 },
    { month: 'Jul', total: 98, disappearances: 36, killings: 30, abductions: 32 },
    { month: 'Aug', total: 105, disappearances: 39, killings: 33, abductions: 33 },
    { month: 'Sep', total: 119, disappearances: 45, killings: 37, abductions: 37 },
    { month: 'Oct', total: 128, disappearances: 48, killings: 40, abductions: 40 },
    { month: 'Nov', total: 134, disappearances: 51, killings: 42, abductions: 41 },
    { month: 'Dec', total: 142, disappearances: 54, killings: 44, abductions: 44 }
  ];

  const vulnerableGroups = [
    { group: 'Human Rights Activists', count: 287, percentage: 23.0, risk: 'high' },
    { group: 'Journalists', count: 156, percentage: 12.5, risk: 'high' },
    { group: 'Environmental Defenders', count: 134, percentage: 10.7, risk: 'medium' },
    { group: 'Opposition Politicians', count: 98, percentage: 7.9, risk: 'medium' },
    { group: 'Community Leaders', count: 178, percentage: 14.3, risk: 'medium' },
    { group: 'Students', count: 145, percentage: 11.6, risk: 'low' },
    { group: 'Legal Practitioners', count: 89, percentage: 7.1, risk: 'medium' },
    { group: 'General Citizens', count: 160, percentage: 12.9, risk: 'low' }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const formatTrend = (trend) => {
    return trend > 0 ? `+${trend}%` : `${trend}%`;
  };

  const StatCard = ({ title, value, change, icon, color = 'primary' }) => (
    <Card elevation={2} sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
          <Box sx={{ color: `${color}.main` }}>
            {icon}
          </Box>
        </Box>
        <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
          {value.toLocaleString()}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {change > 0 ? (
            <TrendingUp color="error" sx={{ mr: 1 }} />
          ) : (
            <TrendingDown color="success" sx={{ mr: 1 }} />
          )}
          <Typography 
            variant="body2" 
            color={change > 0 ? 'error.main' : 'success.main'}
            fontWeight={600}
          >
            {formatTrend(change)} from last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  const CategoryPieChart = ({ data }) => (
    <Card elevation={2} sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          Cases by Category
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsPieChart>
            <PieChart
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </PieChart>
            <RechartsTooltip 
              formatter={(value, name) => [value, name]}
              labelFormatter={(label) => `Cases: ${label}`}
            />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
        <Box sx={{ mt: 2 }}>
          {data.map((category, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    width: 12, 
                    height: 12, 
                    backgroundColor: category.color, 
                    mr: 1,
                    borderRadius: '50%'
                  }} 
                />
                <Typography variant="body2">
                  {category.name}
                </Typography>
              </Box>
              <Typography variant="body2" fontWeight={600}>
                {category.count} ({category.percentage}%)
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );

  const RegionBarChart = ({ data }) => (
    <Card elevation={2} sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          Cases by Region
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={12}
            />
            <YAxis />
            <RechartsTooltip 
              formatter={(value, name) => [value, 'Cases']}
              labelFormatter={(label) => `Region: ${label}`}
            />
            <Bar dataKey="cases" fill="#1976d2" radius={[4, 4, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const TimelineAreaChart = ({ data }) => (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          Monthly Trends (2024)
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorDisappearances" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff9800" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ff9800" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorKillings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f44336" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f44336" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorAbductions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#2196f3" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="disappearances" 
              stackId="1"
              stroke="#ff9800" 
              fillOpacity={1} 
              fill="url(#colorDisappearances)"
              name="Disappearances"
            />
            <Area 
              type="monotone" 
              dataKey="killings" 
              stackId="1"
              stroke="#f44336" 
              fillOpacity={1} 
              fill="url(#colorKillings)"
              name="Killings"
            />
            <Area 
              type="monotone" 
              dataKey="abductions" 
              stackId="1"
              stroke="#2196f3" 
              fillOpacity={1} 
              fill="url(#colorAbductions)"
              name="Abductions"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const VulnerableGroupsRadarChart = ({ data }) => (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          Vulnerable Groups Analysis
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis 
              dataKey="group" 
              fontSize={10}
              tick={{ fontSize: 10 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 300]}
              fontSize={8}
            />
            <Radar
              name="Cases"
              dataKey="count"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <RechartsTooltip 
              formatter={(value, name) => [value, 'Cases']}
              labelFormatter={(label) => `Group: ${label}`}
            />
          </RadarChart>
        </ResponsiveContainer>
        <Box sx={{ mt: 2 }}>
          {data.slice(0, 4).map((group, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">
                {group.group}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" fontWeight={600}>
                  {group.count}
                </Typography>
                <Chip 
                  label={group.risk.toUpperCase()} 
                  color={getRiskColor(group.risk)}
                  size="small"
                />
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );

  const TrendLineChart = () => (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          Case Resolution Trends
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#1976d2" 
              strokeWidth={3}
              name="Total Cases"
              dot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
            <Home sx={{ mr: 0.5, fontSize: 20 }} />
            Mwangaza
          </Typography>
        </Link>
        <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
          <Analytics sx={{ mr: 0.5, fontSize: 20 }} />
          Public Analytics
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Analytics sx={{ mr: 2, fontSize: 48, color: 'primary.main' }} />
          Uchambuzi wa Umma
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
          Public Analytics Dashboard - Human Rights Violations in Kenya
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.7 }}>
          Real-time data visualization and analysis of human rights violations, providing transparency 
          and accountability through comprehensive statistical insights.
        </Typography>
      </Box>

      {/* Controls */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                label="Time Range"
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="30days">Last 30 Days</MenuItem>
                <MenuItem value="90days">Last 90 Days</MenuItem>
                <MenuItem value="6months">Last 6 Months</MenuItem>
                <MenuItem value="1year">Last Year</MenuItem>
                <MenuItem value="all">All Time</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Region</InputLabel>
              <Select
                value={selectedRegion}
                label="Region"
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <MenuItem value="all">All Regions</MenuItem>
                <MenuItem value="nairobi">Nairobi County</MenuItem>
                <MenuItem value="kisumu">Kisumu County</MenuItem>
                <MenuItem value="nakuru">Nakuru County</MenuItem>
                <MenuItem value="mombasa">Mombasa County</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="disappearances">Disappearances</MenuItem>
                <MenuItem value="killings">Killings</MenuItem>
                <MenuItem value="abductions">Abductions</MenuItem>
                <MenuItem value="torture">Torture</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={realTimeUpdate}
                    onChange={(e) => setRealTimeUpdate(e.target.checked)}
                  />
                }
                label="Real-time"
              />
              <IconButton onClick={() => setLastUpdated(new Date())}>
                <Refresh />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Last updated: {lastUpdated.toLocaleString()}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" startIcon={<Download />} size="small">
              Export Data
            </Button>
            <Button variant="outlined" startIcon={<Share />} size="small">
              Share Report
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Key Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Cases"
            value={overallStats.totalCases}
            change={overallStats.monthlyChange.total}
            icon={<Assessment />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Cases"
            value={overallStats.activeCases}
            change={overallStats.monthlyChange.active}
            icon={<Warning />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Resolved Cases"
            value={overallStats.resolvedCases}
            change={overallStats.monthlyChange.resolved}
            icon={<CheckCircle />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Critical Cases"
            value={overallStats.criticalCases}
            change={overallStats.monthlyChange.critical}
            icon={<Error />}
            color="error"
          />
        </Grid>
      </Grid>

      {/* Charts and Visualizations */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <CategoryPieChart data={categoryData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <RegionBarChart data={regionData} />
        </Grid>
      </Grid>

      {/* Timeline and Trends */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <TimelineAreaChart data={timelineData} />
        </Grid>
        <Grid item xs={12} md={4}>
          <VulnerableGroupsRadarChart data={vulnerableGroups} />
        </Grid>
      </Grid>

      {/* Additional Charts */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <TrendLineChart />
        </Grid>
      </Grid>

      {/* Additional Insights */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                Key Insights
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><TrendingUp color="error" /></ListItemIcon>
                  <ListItemText
                    primary="Increasing Trend in Urban Areas"
                    secondary="Cases in major cities have increased by 15% this quarter"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><People color="warning" /></ListItemIcon>
                  <ListItemText
                    primary="Activists Most Vulnerable"
                    secondary="Human rights activists account for 23% of all documented cases"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Schedule color="info" /></ListItemIcon>
                  <ListItemText
                    primary="Peak Incident Times"
                    secondary="Most incidents occur during evening hours (6-10 PM)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><LocationOn color="success" /></ListItemIcon>
                  <ListItemText
                    primary="Regional Variations"
                    secondary="Coastal regions show 12% improvement in case resolution"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                Methodology & Data Sources
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><Security /></ListItemIcon>
                  <ListItemText
                    primary="IPOA Reports"
                    secondary="Independent Policing Oversight Authority official records"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Gavel /></ListItemIcon>
                  <ListItemText
                    primary="Court Filings"
                    secondary="Judicial system case records and proceedings"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Group /></ListItemIcon>
                  <ListItemText
                    primary="Civil Society Reports"
                    secondary="Human rights organizations and NGO documentation"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Search /></ListItemIcon>
                  <ListItemText
                    primary="Media Monitoring"
                    secondary="Verified reports from credible news sources"
                  />
                </ListItem>
              </List>
              
              <Alert severity="info" sx={{ mt: 2 }}>
                All data is anonymized and aggregated to protect victim privacy while maintaining statistical accuracy.
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Call to Action */}
      <Paper elevation={2} sx={{ p: 4, mt: 4, textAlign: 'center', borderRadius: 3, bgcolor: 'primary.light' }}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 2, color: 'primary.contrastText' }}>
          Help Us Improve Transparency
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'primary.contrastText' }}>
          This data represents real human stories. Every case matters in our fight for justice and accountability.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            color="inherit"
            component={Link}
            href="/report"
            startIcon={<Security />}
          >
            Report an Incident
          </Button>
          <Button 
            variant="outlined" 
            color="inherit"
            component={Link}
            href="/victims"
            startIcon={<People />}
          >
            View Victims Memorial
          </Button>
          <Button 
            variant="outlined" 
            color="inherit"
            component={Link}
            href="/rights"
            startIcon={<Gavel />}
          >
            Know Your Rights
          </Button>
        </Box>
      </Paper>
    </Container>
  );
} 
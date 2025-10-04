import React, { useEffect, useState, Component } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'
import {
  CloudIcon,
  FilterIcon,
  RefreshCwIcon,
  InfoIcon,
  CalendarIcon,
  AlertTriangleIcon,
  WindIcon,
  ThermometerIcon,
  DropletIcon,
  EyeIcon,
  SunIcon,
  MoonIcon,
  CheckCircleIcon,
} from 'lucide-react'
// Mock data for the dashboard
const mockAirQualityData = [
  {
    name: 'Jan',
    pm25: 35,
    pm10: 50,
    o3: 30,
    no2: 20,
  },
  {
    name: 'Feb',
    pm25: 28,
    pm10: 48,
    o3: 28,
    no2: 18,
  },
  {
    name: 'Mar',
    pm25: 32,
    pm10: 45,
    o3: 35,
    no2: 22,
  },
  {
    name: 'Apr',
    pm25: 40,
    pm10: 55,
    o3: 32,
    no2: 25,
  },
  {
    name: 'May',
    pm25: 45,
    pm10: 60,
    o3: 38,
    no2: 30,
  },
  {
    name: 'Jun',
    pm25: 50,
    pm10: 65,
    o3: 42,
    no2: 32,
  },
  {
    name: 'Jul',
    pm25: 55,
    pm10: 70,
    o3: 45,
    no2: 35,
  },
  {
    name: 'Aug',
    pm25: 48,
    pm10: 63,
    o3: 40,
    no2: 30,
  },
  {
    name: 'Sep',
    pm25: 42,
    pm10: 58,
    o3: 36,
    no2: 28,
  },
  {
    name: 'Oct',
    pm25: 38,
    pm10: 53,
    o3: 33,
    no2: 25,
  },
  {
    name: 'Nov',
    pm25: 32,
    pm10: 48,
    o3: 30,
    no2: 22,
  },
  {
    name: 'Dec',
    pm25: 30,
    pm10: 45,
    o3: 28,
    no2: 20,
  },
]
const mockForecastData = [
  {
    day: 'Today',
    aqi: 45,
    weather: 'Sunny',
    temp: 72,
    icon: <SunIcon className="h-5 w-5" />,
  },
  {
    day: 'Tomorrow',
    aqi: 52,
    weather: 'Partly Cloudy',
    temp: 68,
    icon: <CloudIcon className="h-5 w-5" />,
  },
  {
    day: 'Wed',
    aqi: 60,
    weather: 'Cloudy',
    temp: 65,
    icon: <CloudIcon className="h-5 w-5" />,
  },
  {
    day: 'Thu',
    aqi: 75,
    weather: 'Sunny',
    temp: 70,
    icon: <SunIcon className="h-5 w-5" />,
  },
  {
    day: 'Fri',
    aqi: 80,
    weather: 'Sunny',
    temp: 75,
    icon: <SunIcon className="h-5 w-5" />,
  },
  {
    day: 'Sat',
    aqi: 65,
    weather: 'Partly Cloudy',
    temp: 72,
    icon: <CloudIcon className="h-5 w-5" />,
  },
  {
    day: 'Sun',
    aqi: 55,
    weather: 'Partly Cloudy',
    temp: 70,
    icon: <CloudIcon className="h-5 w-5" />,
  },
]
const mockSensorLocations = [
  {
    id: 1,
    lat: 40.7128,
    lng: -74.006,
    aqi: 45,
    name: 'New York City',
  },
  {
    id: 2,
    lat: 34.0522,
    lng: -118.2437,
    aqi: 85,
    name: 'Los Angeles',
  },
  {
    id: 3,
    lat: 41.8781,
    lng: -87.6298,
    aqi: 60,
    name: 'Chicago',
  },
  {
    id: 4,
    lat: 29.7604,
    lng: -95.3698,
    aqi: 70,
    name: 'Houston',
  },
  {
    id: 5,
    lat: 39.9526,
    lng: -75.1652,
    aqi: 50,
    name: 'Philadelphia',
  },
  {
    id: 6,
    lat: 33.4484,
    lng: -112.074,
    aqi: 90,
    name: 'Phoenix',
  },
  {
    id: 7,
    lat: 49.2827,
    lng: -123.1207,
    aqi: 30,
    name: 'Vancouver',
  },
  {
    id: 8,
    lat: 45.5017,
    lng: -73.5673,
    aqi: 40,
    name: 'Montreal',
  },
  {
    id: 9,
    lat: 43.6532,
    lng: -79.3832,
    aqi: 55,
    name: 'Toronto',
  },
  {
    id: 10,
    lat: 19.4326,
    lng: -99.1332,
    aqi: 95,
    name: 'Mexico City',
  },
]
// Helper function to get color based on AQI value
const getAqiColor = (aqi) => {
  if (aqi <= 50) return '#14FF9E' // Good - Green
  if (aqi <= 100) return '#FFC300' // Moderate - Yellow
  if (aqi <= 150) return '#FF5733' // Unhealthy for Sensitive Groups - Orange
  return '#C70039' // Unhealthy - Red
}
export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('map')
  const [selectedPollutant, setSelectedPollutant] = useState('pm25')
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="pt-16 min-h-screen bg-background-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Air Quality <span className="text-neon-cyan">Dashboard</span>
            </h1>
            <p className="text-text-secondary">
              Real-time air quality data for North America
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 bg-background-light/30 rounded-md px-3 py-1.5 border border-neon-cyan/30">
              <CalendarIcon className="h-4 w-4 text-neon-cyan" />
              <span className="text-text-secondary text-sm">
                {new Date().toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <RefreshCwIcon className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-neon-cyan/20 pb-2">
          <button
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all duration-200 ${activeTab === 'map' ? 'bg-neon-cyan/10 text-neon-cyan border-b-2 border-neon-cyan' : 'text-text-secondary hover:text-neon-cyan'}`}
            onClick={() => setActiveTab('map')}
          >
            Map View
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all duration-200 ${activeTab === 'trends' ? 'bg-neon-cyan/10 text-neon-cyan border-b-2 border-neon-cyan' : 'text-text-secondary hover:text-neon-cyan'}`}
            onClick={() => setActiveTab('trends')}
          >
            Trends & Analysis
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all duration-200 ${activeTab === 'forecast' ? 'bg-neon-cyan/10 text-neon-cyan border-b-2 border-neon-cyan' : 'text-text-secondary hover:text-neon-cyan'}`}
            onClick={() => setActiveTab('forecast')}
          >
            7-Day Forecast
          </button>
        </div>

        {/* Main Dashboard Content */}
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-text-secondary">Loading dashboard data...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Map View */}
            {activeTab === 'map' && (
              <div className="space-y-6">
                {/* Filters */}
                <Card className="p-4 flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <FilterIcon className="h-4 w-4 text-neon-cyan" />
                    <span className="text-text-primary text-sm font-medium">
                      Filters:
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className={`px-3 py-1 rounded-full text-xs ${selectedPollutant === 'pm25' ? 'bg-neon-cyan text-background-dark' : 'bg-background-light/30 text-text-secondary hover:bg-neon-cyan/20'}`}
                      onClick={() => setSelectedPollutant('pm25')}
                    >
                      PM2.5
                    </button>
                    <button
                      className={`px-3 py-1 rounded-full text-xs ${selectedPollutant === 'pm10' ? 'bg-neon-cyan text-background-dark' : 'bg-background-light/30 text-text-secondary hover:bg-neon-cyan/20'}`}
                      onClick={() => setSelectedPollutant('pm10')}
                    >
                      PM10
                    </button>
                    <button
                      className={`px-3 py-1 rounded-full text-xs ${selectedPollutant === 'o3' ? 'bg-neon-cyan text-background-dark' : 'bg-background-light/30 text-text-secondary hover:bg-neon-cyan/20'}`}
                      onClick={() => setSelectedPollutant('o3')}
                    >
                      Ozone (O₃)
                    </button>
                    <button
                      className={`px-3 py-1 rounded-full text-xs ${selectedPollutant === 'no2' ? 'bg-neon-cyan text-background-dark' : 'bg-background-light/30 text-text-secondary hover:bg-neon-cyan/20'}`}
                      onClick={() => setSelectedPollutant('no2')}
                    >
                      Nitrogen Dioxide (NO₂)
                    </button>
                  </div>
                  <div className="ml-auto">
                    <Button variant="outline" size="sm" className="text-xs">
                      Advanced Filters
                    </Button>
                  </div>
                </Card>

                {/* Map and Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Map */}
                  <Card className="lg:col-span-2 p-1 overflow-hidden h-[500px] border border-neon-cyan/30">
                    <MapContainer
                      center={[40, -100]}
                      zoom={3.5}
                      style={{
                        height: '100%',
                        width: '100%',
                        background: '#0B1D2A',
                      }}
                      attributionControl={false}
                    >
                      <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      {mockSensorLocations.map((sensor) => (
                        <CircleMarker
                          key={sensor.id}
                          center={[sensor.lat, sensor.lng]}
                          radius={sensor.aqi / 10}
                          pathOptions={{
                            fillColor: getAqiColor(sensor.aqi),
                            fillOpacity: 0.7,
                            color: getAqiColor(sensor.aqi),
                            weight: 1,
                          }}
                        >
                          <Popup>
                            <div className="bg-background-dark text-text-primary p-2 rounded">
                              <h3 className="font-bold">{sensor.name}</h3>
                              <p className="text-sm">
                                AQI:{' '}
                                <span
                                  style={{
                                    color: getAqiColor(sensor.aqi),
                                  }}
                                >
                                  {sensor.aqi}
                                </span>
                              </p>
                            </div>
                          </Popup>
                        </CircleMarker>
                      ))}
                    </MapContainer>
                  </Card>

                  {/* Stats */}
                  <div className="space-y-6">
                    <Card className="p-4 border border-neon-cyan/30">
                      <h3 className="text-lg font-medium text-text-primary mb-4">
                        Air Quality Index
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-text-secondary text-sm">
                              PM2.5
                            </span>
                            <span className="text-neon-cyan text-sm">
                              35 μg/m³
                            </span>
                          </div>
                          <div className="h-2 bg-background-light/30 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-neon-cyan rounded-full"
                              style={{
                                width: '35%',
                              }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-text-secondary text-sm">
                              PM10
                            </span>
                            <span className="text-neon-cyan text-sm">
                              50 μg/m³
                            </span>
                          </div>
                          <div className="h-2 bg-background-light/30 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-neon-green rounded-full"
                              style={{
                                width: '50%',
                              }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-text-secondary text-sm">
                              Ozone (O₃)
                            </span>
                            <span className="text-alert-yellow text-sm">
                              70 ppb
                            </span>
                          </div>
                          <div className="h-2 bg-background-light/30 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-alert-yellow rounded-full"
                              style={{
                                width: '70%',
                              }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-text-secondary text-sm">
                              NO₂
                            </span>
                            <span className="text-neon-green text-sm">
                              25 ppb
                            </span>
                          </div>
                          <div className="h-2 bg-background-light/30 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-neon-green rounded-full"
                              style={{
                                width: '25%',
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 border border-neon-cyan/30">
                      <h3 className="text-lg font-medium text-text-primary mb-4">
                        Current Conditions
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                          <ThermometerIcon className="h-5 w-5 text-neon-cyan" />
                          <div>
                            <p className="text-text-secondary text-xs">
                              Temperature
                            </p>
                            <p className="text-text-primary font-medium">
                              72°F
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <DropletIcon className="h-5 w-5 text-neon-cyan" />
                          <div>
                            <p className="text-text-secondary text-xs">
                              Humidity
                            </p>
                            <p className="text-text-primary font-medium">45%</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <WindIcon className="h-5 w-5 text-neon-cyan" />
                          <div>
                            <p className="text-text-secondary text-xs">Wind</p>
                            <p className="text-text-primary font-medium">
                              8 mph NW
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <EyeIcon className="h-5 w-5 text-neon-cyan" />
                          <div>
                            <p className="text-text-secondary text-xs">
                              Visibility
                            </p>
                            <p className="text-text-primary font-medium">
                              10 miles
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-neon-cyan/20">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-text-secondary text-xs">
                              Overall Air Quality
                            </p>
                            <p className="text-alert-yellow font-medium">
                              Moderate
                            </p>
                          </div>
                          <div className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              Health Impact
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Trends & Analysis */}
            {activeTab === 'trends' && (
              <div className="space-y-6">
                <Card className="p-6 border border-neon-cyan/30">
                  <h3 className="text-lg font-medium text-text-primary mb-4">
                    Annual Air Quality Trends
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={mockAirQualityData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#112A3E" />
                        <XAxis dataKey="name" stroke="#B0BEC5" />
                        <YAxis stroke="#B0BEC5" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#0B1D2A',
                            borderColor: '#00E6FF',
                            color: '#FFFFFF',
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="pm25"
                          stroke="#00E6FF"
                          activeDot={{
                            r: 8,
                          }}
                          name="PM2.5"
                        />
                        <Line
                          type="monotone"
                          dataKey="pm10"
                          stroke="#14FF9E"
                          name="PM10"
                        />
                        <Line
                          type="monotone"
                          dataKey="o3"
                          stroke="#FFC300"
                          name="Ozone (O₃)"
                        />
                        <Line
                          type="monotone"
                          dataKey="no2"
                          stroke="#FF5733"
                          name="NO₂"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 border border-neon-cyan/30">
                    <h3 className="text-lg font-medium text-text-primary mb-4">
                      Pollutant Comparison
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={mockAirQualityData.slice(0, 6)}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#112A3E"
                          />
                          <XAxis dataKey="name" stroke="#B0BEC5" />
                          <YAxis stroke="#B0BEC5" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#0B1D2A',
                              borderColor: '#00E6FF',
                              color: '#FFFFFF',
                            }}
                          />
                          <Legend />
                          <Bar dataKey="pm25" fill="#00E6FF" name="PM2.5" />
                          <Bar dataKey="pm10" fill="#14FF9E" name="PM10" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>

                  <Card className="p-6 border border-neon-cyan/30">
                    <h3 className="text-lg font-medium text-text-primary mb-4">
                      Seasonal Patterns
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={mockAirQualityData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#112A3E"
                          />
                          <XAxis dataKey="name" stroke="#B0BEC5" />
                          <YAxis stroke="#B0BEC5" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#0B1D2A',
                              borderColor: '#00E6FF',
                              color: '#FFFFFF',
                            }}
                          />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="o3"
                            stackId="1"
                            stroke="#00E6FF"
                            fill="#00E6FF33"
                            name="Ozone (O₃)"
                          />
                          <Area
                            type="monotone"
                            dataKey="no2"
                            stackId="1"
                            stroke="#14FF9E"
                            fill="#14FF9E33"
                            name="NO₂"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </div>

                <Card className="p-6 border border-neon-cyan/30">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-text-primary">
                      Key Insights
                    </h3>
                    <Button variant="outline" size="sm">
                      Export Report
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-background-light/30 p-4 rounded-lg border border-neon-cyan/20">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-neon-cyan/20 rounded-full flex items-center justify-center mr-3">
                          <TrendingUpIcon className="h-4 w-4 text-neon-cyan" />
                        </div>
                        <h4 className="text-text-primary font-medium">
                          Trend Analysis
                        </h4>
                      </div>
                      <p className="text-text-secondary text-sm">
                        PM2.5 levels have decreased by 15% over the last year,
                        indicating improved air quality in urban areas.
                      </p>
                    </div>

                    <div className="bg-background-light/30 p-4 rounded-lg border border-neon-cyan/20">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-alert-yellow/20 rounded-full flex items-center justify-center mr-3">
                          <AlertTriangleIcon className="h-4 w-4 text-alert-yellow" />
                        </div>
                        <h4 className="text-text-primary font-medium">
                          Hot Spots
                        </h4>
                      </div>
                      <p className="text-text-secondary text-sm">
                        Major urban centers show consistently higher NO₂ levels
                        during weekday rush hours (7-9am, 4-6pm).
                      </p>
                    </div>

                    <div className="bg-background-light/30 p-4 rounded-lg border border-neon-cyan/20">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-neon-green/20 rounded-full flex items-center justify-center mr-3">
                          <CloudIcon className="h-4 w-4 text-neon-green" />
                        </div>
                        <h4 className="text-text-primary font-medium">
                          Seasonal Patterns
                        </h4>
                      </div>
                      <p className="text-text-secondary text-sm">
                        Ozone levels peak during summer months due to increased
                        sunlight and heat accelerating photochemical reactions.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Forecast */}
            {activeTab === 'forecast' && (
              <div className="space-y-6">
                <Card className="p-6 border border-neon-cyan/30">
                  <h3 className="text-lg font-medium text-text-primary mb-6">
                    7-Day Air Quality Forecast
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                    {mockForecastData.map((day, index) => (
                      <div
                        key={index}
                        className="bg-background-light/30 rounded-lg p-4 border border-neon-cyan/20 transition-transform hover:transform hover:-translate-y-1"
                      >
                        <div className="text-center">
                          <p className="text-text-primary font-medium mb-2">
                            {day.day}
                          </p>
                          <div className="flex justify-center mb-2">
                            {day.icon}
                          </div>
                          <p className="text-text-secondary text-sm mb-2">
                            {day.weather}
                          </p>
                          <p className="text-text-secondary text-sm mb-4">
                            {day.temp}°F
                          </p>
                          <div
                            className="rounded-full py-1 px-3 text-sm font-medium mx-auto w-fit"
                            style={{
                              backgroundColor: `${getAqiColor(day.aqi)}20`,
                              color: getAqiColor(day.aqi),
                            }}
                          >
                            AQI: {day.aqi}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-6 border border-neon-cyan/30">
                    <h3 className="text-lg font-medium text-text-primary mb-4">
                      Forecast Accuracy
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            {
                              day: 1,
                              predicted: 45,
                              actual: 48,
                            },
                            {
                              day: 2,
                              predicted: 50,
                              actual: 52,
                            },
                            {
                              day: 3,
                              predicted: 55,
                              actual: 53,
                            },
                            {
                              day: 4,
                              predicted: 60,
                              actual: 58,
                            },
                            {
                              day: 5,
                              predicted: 58,
                              actual: 60,
                            },
                            {
                              day: 6,
                              predicted: 52,
                              actual: 55,
                            },
                            {
                              day: 7,
                              predicted: 48,
                              actual: 50,
                            },
                          ]}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#112A3E"
                          />
                          <XAxis dataKey="day" stroke="#B0BEC5" />
                          <YAxis stroke="#B0BEC5" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#0B1D2A',
                              borderColor: '#00E6FF',
                              color: '#FFFFFF',
                            }}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="predicted"
                            stroke="#00E6FF"
                            name="Predicted AQI"
                          />
                          <Line
                            type="monotone"
                            dataKey="actual"
                            stroke="#14FF9E"
                            name="Actual AQI"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-text-secondary text-sm">
                        Our forecast model achieves 94% accuracy within ±5 AQI
                        points
                      </p>
                    </div>
                  </Card>

                  <Card className="p-6 border border-neon-cyan/30">
                    <h3 className="text-lg font-medium text-text-primary mb-4">
                      Health Recommendations
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-background-light/30 p-4 rounded-lg border-l-4 border-neon-green">
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">
                            <CheckCircleIcon className="h-5 w-5 text-neon-green" />
                          </div>
                          <div>
                            <h4 className="text-text-primary font-medium mb-1">
                              Today & Tomorrow
                            </h4>
                            <p className="text-text-secondary text-sm">
                              Air quality is good. It's an ideal time for
                              outdoor activities for all individuals, including
                              sensitive groups.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-background-light/30 p-4 rounded-lg border-l-4 border-alert-yellow">
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">
                            <AlertTriangleIcon className="h-5 w-5 text-alert-yellow" />
                          </div>
                          <div>
                            <h4 className="text-text-primary font-medium mb-1">
                              Wednesday - Friday
                            </h4>
                            <p className="text-text-secondary text-sm">
                              Moderate air quality expected. Unusually sensitive
                              individuals should consider limiting prolonged
                              outdoor activities.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-background-light/30 p-4 rounded-lg border-l-4 border-neon-green">
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">
                            <CheckCircleIcon className="h-5 w-5 text-neon-green" />
                          </div>
                          <div>
                            <h4 className="text-text-primary font-medium mb-1">
                              Weekend
                            </h4>
                            <p className="text-text-secondary text-sm">
                              Air quality improving to good levels. Excellent
                              conditions for outdoor weekend plans and
                              activities.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 text-center">
                      <Button variant="primary" size="sm">
                        Get Personalized Health Advice
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
// Component for Trending Up Icon
const TrendingUpIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
)

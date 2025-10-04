class DashboardModel {
  final double aqi;
  final double pm25;
  final double no2;
  final double o3;
  final double pm10;
  final double temperature;
  final double windSpeed;
  final String stateCode;

  DashboardModel({
    required this.aqi,
    required this.pm25,
    required this.temperature,
    required this.windSpeed,
    required this.no2,
    required this.o3,
    required this.pm10,
    required this.stateCode,
  });

  factory DashboardModel.fromJson(Map<String, dynamic> json) {
    return DashboardModel(
      aqi: (json['aqi'] ?? 0).toDouble(),
      pm25: (json['pm25'] ?? 0).toDouble(),
      temperature: (json['temperature'] ?? 0).toDouble(),
      windSpeed: (json['windSpeed'] ?? 0).toDouble(),
      no2: (json['no2'] ?? 0).toDouble(),
      o3: (json['o3'] ?? 0).toDouble(),
      pm10: (json['pm10'] ?? 0).toDouble(),
      stateCode: json['stateCode'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'aqi': aqi,
      'pm25': pm25,
      'temperature': temperature,
      'windSpeed': windSpeed,
      'no2': no2,
      'o3': o3,
      'pm10': pm10,
      'stateCode': stateCode,
    };
  }
}

import 'package:flutter/material.dart';
import '../../../../data/models/dashboard_model.dart';
import 'detail_column.dart';

class WeatherDetailsRow extends StatelessWidget {
  final DashboardModel dashboard;

  const WeatherDetailsRow({super.key, required this.dashboard});

  @override
  Widget build(BuildContext context) {
    return  Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        DetailColumn(
          icon: Icons.thermostat_outlined,
          iconColor: Colors.orange,
          value: "${dashboard.temperature}°F",
          label: "Temperature",
        ),
        VerticalDivider(
          color: Colors.white10,
          thickness: 1,
          indent: 8,
          endIndent: 8,
        ),
        DetailColumn(
          icon: Icons.air_outlined,
          iconColor: Colors.grey,
          value: "${dashboard.windSpeed} mph",
          label: "Wind",
        ),
      ],
    );
  }
}

import 'package:flutter/material.dart';
import 'bullet_point_item.dart';

class DataSourceList extends StatelessWidget {
  const DataSourceList({super.key});

  @override
  Widget build(BuildContext context) {
    final dataSources = [
      "TEMPO (NASA Tropospheric Emissions Monitoring of Pollution)",
      "AirNow – U.S. EPA Air Quality Data",
      "NOAA – National Oceanic and Atmospheric Administration",
      "OpenAQ – Global Air Quality Network",
      "Other NASA data sources for research and building the overall logic",
    ];

    return ListView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: dataSources.length,
      padding: EdgeInsetsGeometry.zero,
      itemBuilder: (context, index) {
        final text = dataSources[index];
        return BulletPointItem(text: text);
      },
    );
  }
}

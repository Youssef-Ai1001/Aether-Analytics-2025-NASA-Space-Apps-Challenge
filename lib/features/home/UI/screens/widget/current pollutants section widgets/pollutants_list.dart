import 'package:flutter/material.dart';
import 'package:nasa_app/features/home/UI/screens/widget/current%20pollutants%20section%20widgets/pollutants_item.dart';
import '../../../../data/models/dashboard_model.dart';
import '../../../../data/models/pollutant_model.dart';

class PollutantsList extends StatelessWidget {
  final DashboardModel dashboard;

  const PollutantsList({super.key, required this.dashboard});

  @override
  Widget build(BuildContext context) {
    final List<PollutantModel> pollutants = [
      PollutantModel(
        title: "NO₂",
        value: dashboard.no2,
        unit: "ppb",
        status: "Moderate",
      ),
      PollutantModel(
        title: "O₃",
        value: dashboard.o3,
        unit: "ppb",
        status: "Unhealthy",
      ),
      PollutantModel(
        title: "PM2.5",
        value: dashboard.pm25,
        unit: "µg/m³",
        status: "Moderate",
      ),
      PollutantModel(
        title: "PM10",
        value: dashboard.pm10,
        unit: "µg/m³",
        status: "Good",
      ),
    ];

    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      padding: EdgeInsets.zero,
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        childAspectRatio: 1.3,
        crossAxisSpacing: 12,
        mainAxisSpacing: 12,
      ),
      itemCount: pollutants.length,
      itemBuilder: (context, index) {
        final item = pollutants[index];
        return PollutantsItem(
          title: item.title,
          value: item.value,
          unit: item.unit,
          status: item.status,
        );
      },
    );
  }
}

import 'package:flutter/material.dart';
import 'package:nasa_app/features/home/UI/screens/widget/current%20pollutants%20section%20widgets/pollutants_item.dart';
import 'package:nasa_app/features/home/data/models/pollutant_model.dart';

class PollutantsList extends StatefulWidget {
  const PollutantsList({super.key});

  @override
  State<PollutantsList> createState() => _PollutantsListState();
}

class _PollutantsListState extends State<PollutantsList> {
  final List<PollutantModel> pollutants = [
    PollutantModel(title: "NO₂", value: 45, unit: "ppb", status: "Moderate"),
    PollutantModel(title: "SO₂", value: 12, unit: "ppb", status: "Good"),
    PollutantModel(title: "O₃", value: 67, unit: "ppb", status: "Unhealthy"),
    PollutantModel(title: "CO", value: 2, unit: "ppm", status: "Good"),
  ];

  @override
  Widget build(BuildContext context) {
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

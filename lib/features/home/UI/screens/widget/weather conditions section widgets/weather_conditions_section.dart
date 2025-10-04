import 'package:flutter/material.dart';
import 'package:nasa_app/features/home/UI/screens/widget/weather%20conditions%20section%20widgets/weather_details_row.dart';
import '../../../../../../core/utils/app_text_styles.dart';
import '../../../../data/models/dashboard_model.dart';

class WeatherConditionsSection extends StatelessWidget {
  final DashboardModel dashboard;

  const WeatherConditionsSection({super.key, required this.dashboard});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text("Weather Conditions", style: AppTextStyles.headlineMediumWhiteS18),
        const SizedBox(height: 10),
        WeatherDetailsRow(dashboard: dashboard),
      ],
    );
  }
}

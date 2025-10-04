import 'package:flutter/material.dart';
import 'package:nasa_app/features/home/UI/screens/widget/weather%20conditions%20section%20widgets/weather_details_row.dart';
import '../../../../../../core/utils/app_text_styles.dart';

class WeatherConditionsSection extends StatelessWidget {
  const WeatherConditionsSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text("Weather Conditions", style: AppTextStyles.headlineMediumWhiteS18),
        const SizedBox(height: 10),
        const WeatherDetailsRow(),
      ],
    );
  }
}

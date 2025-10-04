import 'package:flutter/material.dart';
import 'package:nasa_app/core/utils/app_text_styles.dart';
import 'package:nasa_app/core/widgets/custom_background_header.dart';
import 'air_quality_ratio_part.dart';
import 'location_part.dart';

class AirQualitySection extends StatelessWidget {
  final double aqi;
  final double pm25;

  const AirQualitySection({super.key, required this.aqi, required this.pm25});

  @override
  Widget build(BuildContext context) {
    return CustomBackgroundHeader(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          LocationPart(location: "San Francisco, CA"),
          SizedBox(height: 6),
          Text(
            "Air Quality Dashboard",
            style: AppTextStyles.headlineMediumWhiteS20,
          ),
          const SizedBox(height: 22),
          AirQualityRatioPart(ratio: aqi.toInt()),
        ],
      ),
    );
  }
}

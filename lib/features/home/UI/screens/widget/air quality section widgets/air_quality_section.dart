import 'package:flutter/material.dart';
import 'package:nasa_app/core/utils/app_text_styles.dart';
import 'package:nasa_app/core/widgets/custom_background_header.dart';
import 'air_quality_ratio_part.dart';
import 'location_part.dart';

class AirQualitySection extends StatefulWidget {
  const AirQualitySection({super.key});

  @override
  State<AirQualitySection> createState() => _AirQualitySectionState();
}

class _AirQualitySectionState extends State<AirQualitySection> {
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
          AirQualityRatioPart(ratio: 30),
        ],
      ),
    );
  }
}

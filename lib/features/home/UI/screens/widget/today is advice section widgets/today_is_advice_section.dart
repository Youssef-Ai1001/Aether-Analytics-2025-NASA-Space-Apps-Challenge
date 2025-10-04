import 'package:flutter/material.dart';
import 'package:nasa_app/features/home/UI/screens/widget/today%20is%20advice%20section%20widgets/today_is_advice_card.dart';

class TodayIsAdviceSection extends StatelessWidget {
  const TodayIsAdviceSection({super.key});

  @override
  Widget build(BuildContext context) {
    return TodayIsAdviceCard(
      advice:
          "Air quality is fair. Outdoor activities are fine, just avoid peak hours.",
    );
  }
}

import 'package:flutter/material.dart';
import 'package:nasa_app/features/home/UI/screens/widget/current%20pollutants%20section%20widgets/pollutants_list.dart';
import '../../../../../../core/utils/app_text_styles.dart';
import '../../../../data/models/dashboard_model.dart';

class CurrentPollutantsSection extends StatelessWidget {
  final DashboardModel dashboard;

  const CurrentPollutantsSection({super.key, required this.dashboard});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "Current Pollutants",
          style: AppTextStyles.headlineMediumWhiteS18,
        ),
        const SizedBox(height: 10),
        PollutantsList(dashboard: dashboard),
      ],
    );
  }
}

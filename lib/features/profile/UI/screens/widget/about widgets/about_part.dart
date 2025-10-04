import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:nasa_app/core/utils/app_text_styles.dart';
import 'package:nasa_app/features/profile/UI/screens/widget/about%20widgets/data_sources_section.dart';
import 'our_team_section.dart';

class AboutPart extends StatelessWidget {
  const AboutPart({super.key});

  @override
  Widget build(BuildContext context) {
    return SliverPadding(
      padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 12.h),
      sliver: SliverList(
        delegate: SliverChildListDelegate([
          const DataSourcesSection(),
          SizedBox(height: 16.h),
          const OurTeamSection(),
          SizedBox(height: 16.h),
          Column(
            children: [
              Text("Our Mission", style: AppTextStyles.bodyRegularWhiteS16),
              const SizedBox(height: 5),
              Text(
                "To democratize access to real-time air quality data and empower communities to make informed decisions about their health and environment.",
                textAlign: TextAlign.center,
                style: AppTextStyles.captionRegularGrey400S12,
              ),
              const SizedBox(height: 16),
              Text("1.1.0 V", style: AppTextStyles.captionRegularGrey400S12),
            ],
          ),
        ]),
      ),
    );
  }
}

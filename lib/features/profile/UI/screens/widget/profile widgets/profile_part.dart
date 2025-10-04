import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:nasa_app/features/profile/UI/screens/widget/profile%20widgets/personal_information_section.dart';

class ProfilePart extends StatelessWidget {
  const ProfilePart({super.key});

  @override
  Widget build(BuildContext context) {
    return SliverPadding(
      padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 12.h),
      sliver: SliverList(
        delegate: SliverChildListDelegate([
          const PersonalInformationSection(),
          SizedBox(height: 16.h),
        ]),
      ),
    );
  }
}

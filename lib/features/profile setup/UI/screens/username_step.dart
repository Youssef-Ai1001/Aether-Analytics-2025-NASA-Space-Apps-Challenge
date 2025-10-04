import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:nasa_app/features/profile%20setup/UI/screens/widget/custom_body_step.dart';
import 'package:nasa_app/features/profile%20setup/UI/screens/widget/custom_profile_setup_text_field.dart';

class UsernameStep extends StatelessWidget {
  final TextEditingController usernameController;

  const UsernameStep({super.key, required this.usernameController});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 22.w),
      child: CustomBodyStep(
        gradient: [Color(0xFF5179FF), Color(0xFF9D55FF)],
        icon: Icons.person_outline,
        title: "Write a Username",
        subTitle:
            "Pick a username so other community members can recognize you.",
        body: CustomProfileSetupTextField(
          hint: "Enter your username",
          controller: usernameController,
        ),
        footer: "You can always change your username later in settings.",
      ),
    );
  }
}

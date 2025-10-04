import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:nasa_app/features/auth/UI/screens/widget/custom_header.dart';
import 'package:nasa_app/features/auth/UI/screens/widget/auth_form.dart';
import '../../../../core/utils/app_colors.dart';
import '../../../../core/utils/app_text_styles.dart';

class AuthScreen extends StatelessWidget {
  const AuthScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(gradient: AppColors.firstScaffoldGradient),
        child: SafeArea(
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 24.w, vertical: 16.h),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // ⬅️ Header
                CustomHeader(
                  title: "Welcome",
                  subTitle: "Enter your email to continue",
                ),
                SizedBox(height: 40.h),
                // ⬅️ Form
                const AuthForm(),
                SizedBox(height: 30.h),
                Text(
                  "New to the app? We'll set up your account after verification.",
                  textAlign: TextAlign.center,
                  style: AppTextStyles.bodyRegularWhite70S14,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

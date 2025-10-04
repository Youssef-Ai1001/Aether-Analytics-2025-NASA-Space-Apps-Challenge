import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'app_colors.dart';
import 'app_font_weights.dart';

abstract class AppTextStyles {
  // ✅ Titles (كبيرة وواضحة)
  static TextStyle get headlineBoldWhiteS28 => TextStyle(
    fontSize: 28.sp,
    fontWeight: FontWeights.bold,
    color: Colors.white,
  );

  static TextStyle get headlineSemiBoldWhiteS24 => TextStyle(
    fontSize: 24.sp,
    fontWeight: FontWeights.semiBold,
    color: Colors.white,
  );

  static TextStyle get headlineMediumWhiteS20 => TextStyle(
    fontSize: 20.sp,
    fontWeight: FontWeights.medium,
    color: Colors.white,
  );

  static TextStyle get headlineMediumWhiteS18 => TextStyle(
    fontSize: 18.sp,
    fontWeight: FontWeights.medium,
    color: Colors.white,
  );

  // ✅ Body Text (النصوص العادية)
  static TextStyle get bodyRegularWhiteS16 => TextStyle(
    fontSize: 16.sp,
    fontWeight: FontWeights.regular,
    color: Colors.white,
  );

  static TextStyle get bodyRegularWhite70S14 => TextStyle(
    fontSize: 14.sp,
    fontWeight: FontWeights.regular,
    color: Colors.white70,
  );

  // ✅ Captions / Small Text
  static TextStyle get captionRegularGrey400S12 => TextStyle(
    fontSize: 12.sp,
    fontWeight: FontWeights.regular,
    color: Colors.grey[400],
  );

  // ✅ Button Text
  static TextStyle get button => TextStyle(
    fontSize: 16.sp,
    fontWeight: FontWeights.bold,
    color: Colors.white,
  );

  // ✅ Special colored text
  static TextStyle get primaryText => TextStyle(
    fontSize: 16.sp,
    fontWeight: FontWeights.semiBold,
    color: AppColors.primaryColor,
  );

  // ✅ Error text
  static TextStyle get error => TextStyle(
    fontSize: 14.sp,
    fontWeight: FontWeights.medium,
    color: Colors.redAccent,
  );
}

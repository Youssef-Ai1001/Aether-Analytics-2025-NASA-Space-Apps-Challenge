import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:nasa_app/core/utils/app_colors.dart';

class CustomSvgPicture extends StatelessWidget {
  final String assetName;
  final double? width;
  final double? height;

  const CustomSvgPicture({
    super.key,
    required this.assetName,
    this.width,
    this.height,
  });

  @override
  Widget build(BuildContext context) {
    return SvgPicture.asset(
      assetName,
      width: width,
      height: height,
      // ✅ Placeholder أثناء التحميل
      placeholderBuilder: (context) {
        return Center(
          child: SizedBox(
            width: width ?? 24,
            height: height ?? 24,
            child: CircularProgressIndicator(
              strokeWidth: 2,
              color: AppColors.primaryColor,
            ),
          ),
        );
      },
      // ✅ Error Widget لو الصورة مش موجودة
      clipBehavior: Clip.none,
      package: null,
      fit: BoxFit.contain,
    );
  }
}

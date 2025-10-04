import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:nasa_app/core/utils/app_colors.dart';
import 'detail_column.dart';

class WeatherDetailsRow extends StatelessWidget {
  const WeatherDetailsRow({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 12.h),
      decoration: BoxDecoration(
        color: AppColors.secondaryColor,
        borderRadius: BorderRadius.circular(16.r),
        border: Border.all(color: Colors.white10, width: 1.0),
      ),
      child: IntrinsicHeight(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: const [
            DetailColumn(
              icon: Icons.thermostat_outlined,
              iconColor: Colors.orange,
              value: "72°F",
              label: "Temperature",
            ),
            VerticalDivider(
              color: Colors.white10,
              thickness: 1,
              indent: 8,
              endIndent: 8,
            ),
            DetailColumn(
              icon: Icons.water_drop_outlined,
              iconColor: Colors.lightBlue,
              value: "65%",
              label: "Humidity",
            ),
            VerticalDivider(
              color: Colors.white10,
              thickness: 1,
              indent: 8,
              endIndent: 8,
            ),
            DetailColumn(
              icon: Icons.air_outlined,
              iconColor: Colors.grey,
              value: "8 mph",
              label: "NW",
            ),
          ],
        ),
      ),
    );
  }
}

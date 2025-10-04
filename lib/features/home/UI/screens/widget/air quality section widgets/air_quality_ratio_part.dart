import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../../../../core/utils/app_text_styles.dart';

class AirQualityRatioPart extends StatelessWidget {
  final int ratio;

  const AirQualityRatioPart({super.key, required this.ratio});

  ({String status, Color color}) _getAirQualityInfo(int aqiValue) {
    if (aqiValue <= 50) {
      return (status: "Good", color: Colors.green);
    } else if (aqiValue <= 100) {
      return (status: "Moderate", color: Colors.amber);
    } else if (aqiValue <= 150) {
      return (status: "Unhealthy for Sensitive", color: Colors.orange);
    } else {
      return (status: "Unhealthy", color: Colors.red);
    }
  }

  @override
  Widget build(BuildContext context) {
    final aqiInfo = _getAirQualityInfo(ratio);
    final statusText = aqiInfo.status;
    final statusColor = aqiInfo.color;
    const maxVisualAqi = 200.0;
    final progressValue = (ratio / maxVisualAqi).clamp(0.0, 1.0);

    return Row(
      children: [
        // Circle with dynamic size
        LayoutBuilder(
          builder: (context, constraints) {
            double circleSize = 85.w;
            if (statusText.length > 20) {
              circleSize += 40; // زياده المساحة للنص الطويل
            }

            return Stack(
              alignment: Alignment.center,
              children: [
                RotatedBox(
                  quarterTurns: -1, // يبدأ من الأعلى
                  child: SizedBox(
                    width: circleSize,
                    height: circleSize,
                    child: CircularProgressIndicator(
                      value: progressValue,
                      strokeWidth: 7,
                      backgroundColor: Colors.white12,
                      color: statusColor,
                      strokeCap: StrokeCap.round,
                    ),
                  ),
                ),
                // النصوص داخل الدايرة
                ConstrainedBox(
                  constraints: BoxConstraints(maxWidth: circleSize * 0.8),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        "$ratio",
                        style: AppTextStyles.headlineSemiBoldWhiteS24,
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 2),
                      Text(
                        statusText,
                        style: AppTextStyles.bodyRegularWhite70S14,
                        textAlign: TextAlign.center,
                        softWrap: true,
                      ),
                    ],
                  ),
                ),
              ],
            );
          },
        ),
        const SizedBox(width: 12),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("$ratio", style: AppTextStyles.headlineMediumWhiteS20),
            SizedBox(
              width: 120.w,
              child: Text(
                statusText,
                style: AppTextStyles.bodyRegularWhiteS16.copyWith(
                  color: statusColor,
                ),
                softWrap: true,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              "Updated 5 min ago",
              style: AppTextStyles.captionRegularGrey400S12,
            ),
          ],
        ),
      ],
    );
  }
}

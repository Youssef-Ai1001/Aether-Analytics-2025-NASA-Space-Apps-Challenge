import 'package:flutter/material.dart';
import 'core/utils/app_colors.dart';
import 'core/utils/app_routers.dart';
import 'package:flutter/services.dart';

class AndroidPlatform extends StatelessWidget {
  const AndroidPlatform({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      routerConfig: router,
      theme: ThemeData(
        scaffoldBackgroundColor: AppColors.secondScaffoldGradient,
        colorScheme: ColorScheme.fromSeed(
          seedColor: AppColors.primaryColor,
          brightness: Brightness.dark,
        ),
      ),
      builder: (context, child) {
        return AnnotatedRegion<SystemUiOverlayStyle>(
          value: SystemUiOverlayStyle.light,
          child: child ?? const SizedBox.shrink(),
        );
      },
    );
  }
}

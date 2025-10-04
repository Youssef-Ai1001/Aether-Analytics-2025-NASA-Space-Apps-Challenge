import 'package:flutter/cupertino.dart';
import 'core/utils/app_colors.dart';
import 'core/utils/app_routers.dart';

class IosPlatform extends StatelessWidget {
  const IosPlatform({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoApp.router(
      debugShowCheckedModeBanner: false,
      routerConfig: router,
      theme: CupertinoThemeData(
        primaryColor: AppColors.primaryColor,
        scaffoldBackgroundColor: AppColors.secondScaffoldGradient,
        brightness: Brightness.dark,
      ),
    );
  }
}

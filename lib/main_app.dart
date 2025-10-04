import 'dart:io' show Platform;
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:nasa_app/android_platform.dart';
import 'package:nasa_app/core/network/api_service.dart';
import 'package:nasa_app/features/auth/data/repo/auth_repo_impl.dart';
import 'package:nasa_app/features/profile%20setup/UI/manager/profile_setup_cubit.dart';
import 'package:nasa_app/features/profile%20setup/data/repo/profile_setup_repo_impl.dart';
import 'package:nasa_app/ios_platform.dart';

import 'features/auth/UI/manager/auth_cubit.dart';

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<AuthCubit>(
          create: (_) =>
              AuthCubit(authRepo: AuthRepoImpl(apiService: ApiService())),
        ),
        BlocProvider<ProfileSetupCubit>(
          create: (_) =>
              ProfileSetupCubit(ProfileSetupRepoImpl(apiService: ApiService())),
        ),
      ],
      child: ScreenUtilInit(
        designSize: const Size(375, 812),
        minTextAdapt: true,
        splitScreenMode: true,
        builder: (context, child) {
          if (Platform.isIOS) {
            return IosPlatform();
          } else {
            return AndroidPlatform();
          }
        },
      ),
    );
  }
}

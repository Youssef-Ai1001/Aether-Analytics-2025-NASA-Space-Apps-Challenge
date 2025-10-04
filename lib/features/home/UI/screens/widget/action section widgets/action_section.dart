import 'package:flutter/material.dart';
import 'package:iconly/iconly.dart';
import 'package:nasa_app/features/home/UI/screens/widget/action%20section%20widgets/action_item.dart';

class ActionSection extends StatelessWidget {
  const ActionSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: ActionItem(
            onTap: () {},
            icon: Icons.trending_up,
            label: "Forecast",
          ),
        ),
        const SizedBox(width: 14),
        Expanded(
          child: ActionItem(
            onTap: () {},
            icon: IconlyLight.time_circle,
            label: "History",
          ),
        ),
      ],
    );
  }
}

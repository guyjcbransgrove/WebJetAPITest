import { IconButton } from "@mui/material";
import type { ReactNode } from "react";

export function StyledIconButton(props: {disabled?: boolean, iconComponent: ReactNode, onClick?: () => void}) {
	return (
		<IconButton
			size="large"
			edge="start"
			color="inherit"
			aria-label="menu"
			sx={{ mr: 2}}
			onClick={props.onClick}
			disabled={props.disabled ?? false}
		>
			{props.iconComponent}
		</IconButton>
	);
}
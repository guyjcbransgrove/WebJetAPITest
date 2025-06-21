import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import TheatersIcon from '@mui/icons-material/Theaters';

function TopBar() {
	return (
		<AppBar position='fixed'>
			<Toolbar>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
				>
					<TheatersIcon />
				</IconButton>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Guy: WebjetAPITest
				</Typography>
			</Toolbar>
      	</AppBar>
	);
}

export default TopBar;
import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  CssBaseline,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu, 
  MenuItem,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  AccountCircle as AccountCircleIcon,
  Mail as MailIcon,
  Store as StoreIcon,
  BarChart as BarIcon,
  MultilineChart as MultiChart
} from "@mui/icons-material";
import Store from "./Store";
import Sku from "./SKU";
import Planning from "./Planning";
import MixedChart from "./Chart";
import logo from "../Assets/Svg/logo.svg";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open ? 0 : `-${drawerWidth}px`,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

const list: string[] = ["Store", "Sku", "Planning", "Charts"];

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [current, setCurrent] = useState("Store");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogin = () => {
    if (username === "admin" && password === "password123") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials! Try admin / password123");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setAnchorEl(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (isAuthenticated) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Card sx={{ padding: 3, width: 350, textAlign: "center", boxShadow: 3 }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <CardContent>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="dense"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="dense"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(true)}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon style={{ color: 'black' }} />
            </IconButton>
            <img src={logo} height={50} width={200} alt="Logo" />
          </Box>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircleIcon fontSize="large" style={{ color: "black" }} />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {list.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => setCurrent(text)}>
                <ListItemIcon>  {index===0 && <StoreIcon />}
                  {index===1 && <MailIcon />}
                  {index===2 && <BarIcon />}
                  {index===3 && <MultiChart />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open} style={{ padding: 0 }}>
        <DrawerHeader />
        {current === "Store" && <Store />}
        {current === "Sku" && <Sku />}
        {current === "Planning" && <Planning />}
        {current === "Charts" && <MixedChart />}
      </Main>
    </Box>
  );
}

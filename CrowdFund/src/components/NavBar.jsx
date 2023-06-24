import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ListItemIcon from "@mui/material/ListItemIcon";
import { LoadingButton } from "@mui/lab";
import { useWallet } from "use-wallet";
import { useAuth } from "../contexts/AuthContext";

function NavBar() {
  const navigate = useNavigate();
  const { currentUserCredentials, signout } = useAuth();
  const wallet = useWallet();
  const [profileMenuAnchor, setProfileMenuAnchor] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleSignout = async () => {
    try {
      await signout();
      navigate("/sign-in");
    } catch (error) {
      console.log("Signout Error:", error);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2C3E50" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              textTransform: "none",
              color: "#EFEFEF",
              fontWeight: "bold",
              fontSize: "24px",
              fontFamily: "Arial, sans-serif",
              paddingRight: "20px",
            }}
          >
            CrowdFund
          </Button>
        </Typography>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#2980B9",
              color: "#EFEFEF",
              fontWeight: "bold",
              fontFamily: "Arial, sans-serif",
              width: "200px",
            }}
            onClick={() => navigate("/campaigns")}
          >
            Campaigns
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#2980B9",
              color: "#EFEFEF",
              fontWeight: "bold",
              fontFamily: "Arial, sans-serif",
              width: "200px",
            }}
            onClick={() => navigate("/create-campaign")}
          >
            Create Campaign
          </Button>
          {wallet.status === "connected" ? (
            <>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#2980B9",
                  color: "#EFEFEF",
                  fontWeight: "bold",
                  fontFamily: "Arial, sans-serif",
                  width: "200px",
                }}
                endIcon={<AccountBalanceWalletIcon />}
                onClick={handleProfileMenuOpen}
              >
                {wallet.account.substr(0, 10) + "..."}
              </Button>
              <Menu
                anchorEl={profileMenuAnchor}
                open={Boolean(profileMenuAnchor)}
                onClose={handleProfileMenuClose}
              >
                <MenuItem onClick={() => wallet.reset()}>
                  <ListItemIcon>
                    <AccountBalanceWalletIcon fontSize="small" />
                  </ListItemIcon>
                  Disconnect Wallet
                </MenuItem>
              </Menu>
            </>
          ) : (
            <LoadingButton
              variant="contained"
              sx={{
                bgcolor: "#2980B9",
                color: "#EFEFEF",
                fontWeight: "bold",
                fontFamily: "Arial, sans-serif",
                width: "200px",
              }}
              loading={wallet.status === "connecting"}
              loadingIndicator="Connecting..."
              endIcon={<AccountBalanceWalletIcon />}
              onClick={() => wallet.connect()}
            >
              Connect Wallet
            </LoadingButton>
          )}
          {currentUserCredentials && (
            <Button
              variant="contained"
              sx={{
                bgcolor: "#2980B9",
                color: "#EFEFEF",
                fontWeight: "bold",
                fontFamily: "Arial, sans-serif",
                width: "200px",
              }}
              onClick={handleSignout}
            >
              Sign Out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;

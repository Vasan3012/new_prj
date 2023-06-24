import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
  Button,
  Popover,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { getCampaignsSummary, getDeployedCampaigns } from "../../utils/getCampaigns";
import CampaignCard from "../components/CampaignCard";
import NavBar from "../components/NavBar";

function CampaignsPage() {
  const [campaignsList, setCampaignsList] = useState([]);
  const [filter, setFilter] = useState("All");
  const [anchorEl, setAnchorEl] = useState(null);
  const [optionsVisible, setOptionsVisible] = useState(false);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      const deployedCampaignsList = await getDeployedCampaigns();
      setCampaignsList(await getCampaignsSummary(deployedCampaignsList));
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  const handleFilterChange = (value) => {
    setFilter(value);
    setAnchorEl(null);
    setOptionsVisible(false);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOptionsVisible(!optionsVisible);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOptionsVisible(false);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? "filter-popover" : undefined;

  const filterCampaigns = (campaigns, filter) => {
    switch (filter) {
      case "All":
        return campaigns;
      case "ACTIVE":
      case "SUCCESS":
      case "ABORTED":
      case "EXPIRED":
        return campaigns.filter((campaign) => campaign.campaignStatus === filter);
      default:
        return campaigns;
    }
  };

  const filteredCampaignsList = filterCampaigns(campaignsList, filter);

  const priorityOrder = ["ACTIVE", "SUCCESS", "ABORTED", "EXPIRED"];

  const sortCampaignsByPriority = (campaigns) => {
    return campaigns.sort((a, b) => {
      const priorityA = priorityOrder.indexOf(a.campaignStatus);
      const priorityB = priorityOrder.indexOf(b.campaignStatus);
      return priorityA - priorityB;
    });
  };

  const sortedCampaignsList = sortCampaignsByPriority(filteredCampaignsList);

  return (
    <div>
      <NavBar />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="md">
        <Stack spacing={2} sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              textTransform: "uppercase",
              borderBottom: "4px solid #2C3E50",
              display: "inline-block",
              paddingBottom: "0.5rem",
            }}
          >
            TAKE PART IN ACTIVE CAMPAIGNS
          </Typography>
          <Typography variant="subtitle1">
            Top {sortedCampaignsList.length} recent campaigns
          </Typography>
        </Stack>
        <Container sx={{ py: 2 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <Button
              aria-describedby={popoverId}
              variant="contained"
              onClick={handlePopoverOpen}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "auto",
                minWidth: "150px",
                padding: "8px 16px",
                textTransform: "none",
              }}
            >
              {`Filter: ${filter}`}
              <span
                style={{
                  transform: optionsVisible ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                ▼
              </span>
            </Button>
            <Popover
              id={popoverId}
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <List
                dense
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: optionsVisible ? "center" : "flex-start",
                  transition: "0.3s",
                  overflow: "hidden",
                  height: optionsVisible ? "auto" : 0,
                }}
              >
                <ListItem button onClick={() => handleFilterChange("All")}>
                  <ListItemText primary="All" />
                </ListItem>
                <ListItem button onClick={() => handleFilterChange("ACTIVE")}>
                  <ListItemText primary="Active" />
                </ListItem>
                <ListItem button onClick={() => handleFilterChange("SUCCESS")}>
                  <ListItemText primary="Success" />
                </ListItem>
                <ListItem button onClick={() => handleFilterChange("ABORTED")}>
                  <ListItemText primary="Aborted" />
                </ListItem>
                <ListItem button onClick={() => handleFilterChange("EXPIRED")}>
                  <ListItemText primary="Expired" />
                </ListItem>
              </List>
            </Popover>
          </Stack>
          {campaignsList.length === 0 ? (
            <CircularProgress color="success" sx={{ display: "block", mx: "auto" }} />
          ) : (
            <Grid container spacing={4}>
              {sortedCampaignsList.map((activeCampaign, idx) => (
                <Grid item key={idx} xs={12} sm={6} md={4}>
                  <CampaignCard details={activeCampaign} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Container>
    </div>
  );
}

export default CampaignsPage;

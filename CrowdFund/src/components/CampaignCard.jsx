import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import CardActionArea from "@mui/material/CardActionArea";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ShareIcon from "@mui/icons-material/Share";

import { useNavigate } from "react-router-dom";

function CampaignCard(props) {
  const navigate = useNavigate();

  const {
    bannerUrl,
    campaignStatus,
    title,
    description,
    ethRaised,
    ethFunded,
    deadline,
    id,
  } = props.details;

  const today = Date.now();
  const diffTime = Math.abs(today - new Date(deadline));
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const [imageError, setImageError] = useState(false);

  function handleImageError() {
    setImageError(true);
  }

  function LinearProgressWithLabel(props) {
    const { value } = props;
    const cappedValue = Math.min(value, 100); // Cap the value at 100%

    return (
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" value={cappedValue} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            cappedValue
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  function getDaysLeftText() {
    if (
      campaignStatus === "EXPIRED" ||
      campaignStatus === "SUCCESS" ||
      campaignStatus === "ABORTED"
    ) {
      return "0 days left";
    } else {
      return `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left`;
    }
  }

  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <CardActionArea onClick={() => navigate(`/../campaign/${id}`)}>
        {imageError ? (
          <Box sx={{ height: 120, backgroundColor: "lightgray" }} />
        ) : (
          <CardMedia
            component="img"
            height="120"
            image={bannerUrl}
            alt={title}
            onError={handleImageError}
          />
        )}
        <CardContent>
          <Box sx={{ mb: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography
                component="p"
                variant="subtitle2"
                color={
                  campaignStatus === "ACTIVE" || campaignStatus === "SUCCESS"
                    ? "green"
                    : "red"
                }
                fontWeight="bold"
              >
                {campaignStatus}
              </Typography>
              <IconButton size="small">
                <ShareIcon />
              </IconButton>
            </Stack>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {description}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="body2" color="text.secondary" fontWeight="bold">
              ETH RAISED: {ethFunded}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="body2" color="text.secondary" fontWeight="bold">
              ETH GOAL: {ethRaised}
            </Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <LinearProgressWithLabel value={(ethFunded / ethRaised) * 100} />
          </Box>
          <Stack direction="row" alignItems="center">
            <AccessTimeRoundedIcon fontSize="small" />
            <Typography variant="body2" color="text.secondary" fontWeight="bold" ml={1}>
              {getDaysLeftText()}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CampaignCard;

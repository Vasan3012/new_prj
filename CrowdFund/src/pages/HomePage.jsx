import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { MonetizationOn } from "@mui/icons-material";
import backgroundImage from "./background-image.jpg"; // Replace with the actual path to your background image
import secondImage from "./bg1.png"; // Replace with the actual path to your second image
import thirdImage from "./bg2.jpg"; // Replace with the actual path to your third image

function HomePage() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setShowContent(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <NavBar />

      <Container
        component="main"
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "left",
          borderRadius: "10px",
          p: 4,
          width: "80%",
          maxWidth: "800px",
          backgroundColor: "#FFF",
        }}
      >
        <div
          style={{ alignSelf: "center", marginRight: "2rem" }}
        >
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              color: "#2C3E50",
              fontWeight: "700",
              fontSize: "60px",
              paddingRight: "20px",
              fontFamily: "Walsheim, sans-serif",
            }}
          >
            Small acts, big impact.
          </Typography>
        </div>
        <div>
          <img
            src={backgroundImage}
            alt="Background"
            style={{ maxWidth: "120%", height: "auto", width: "120%" }}
          />
        </div>
      </Container>

      <Container
        component="section"
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          borderRadius: "10px",
          p: 4,
          width: "80%",
          maxWidth: "800px",
          backgroundColor: "#FFF",
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <div>
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{
                color: "#2C3E50",
                fontWeight: "700",
                fontSize: "36px",
                fontFamily: "Walsheim, sans-serif",
              }}
            >
              "Every donation counts, no matter how small."
            </Typography>
            <Button
              component={Link}
              to="/campaigns"
              variant="contained"
              size="large"
              startIcon={<MonetizationOn />}
              sx={{
                mt: 2,
                backgroundColor: "#2c3e50",
                color: "#FFF",
                fontFamily: "Walsheim, sans-serif",
                fontWeight: "500",
                borderRadius: "9999px",
                border: "1px solid #2c3e50",
                padding: "0.78125rem 1.5rem",
                "&:hover": {
                  backgroundColor: "#1769aa",
                },
                textTransform: "none",
              }}
            >
              Donate Now
            </Button>
          </div>
          <div>
            <img
              src={thirdImage}
              alt="Third Image"
              style={{ maxWidth: "80%", height: "auto", marginTop: "2rem" }}
            />
          </div>
        </div>

        <img
          src={secondImage}
          alt="Second Image"
          style={{ maxWidth: "80%", height: "auto" }}
        />

        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            color: "#2C3E50",
            fontWeight: "700",
            fontSize: "32px",
            fontFamily: "Walsheim, sans-serif",
            marginTop: "2rem",
          }}
        >
          About Our Mission
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{
            color: "#2C3E50",
            fontWeight: "400",
            fontSize: "16px",
            fontFamily: "Walsheim, sans-serif",
          }}
        >
          Blockchain-based crowdfunding, also known as decentralized crowdfunding, utilizes blockchain technology to transform the traditional fundraising process. It offers transparency, security, and global accessibility by leveraging smart contracts and tokenization. Backers can participate in crowdfunding campaigns worldwide, while project creators benefit from increased accountability and direct interaction with supporters. This innovative approach enhances trust, efficiency, and opens up new avenues for crowdfunding in the digital age.
        </Typography>
      </Container>

      <Footer />
    </>
  );
}

export default HomePage;

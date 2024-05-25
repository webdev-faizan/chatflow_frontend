import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { User } from "phosphor-react";
import { Box, Stack, IconButton, Divider } from "@mui/material";
import DirectConversion from "./DirectConversion";
import Friends from "../user/UserDialog";

const ChatDashboard = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    userInfo: { fullname },
  } = useSelector((state) => state.app);

  return (
    <Box component={"section"}>
      <Box
        sx={{
          height: "100vh",
          overflowY: "scroll",
          width: "360px",
          background: "#F8FAFF",
          "box-shadow": " 0px 0px 4px 0px rgba(0, 0, 0, 0.25)",

          padding: "10px 10px 30px",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "#000",
            fontFamily: "Manrope",
            fontSize: "32px",
            fontStyle: "normal",
            fontWeight: 800,
            lineHeight: "normal",
            textTransform: "capitalize",
            textAlign: "center",
          }}
        >
          👋 {fullname}
        </Typography>
        <Stack direction={"column"} spacing={3}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              variant="h2"
              sx={{
                color: "#000",
                fontFamily: "Manrope",
                fontSize: "32px",
                fontStyle: "normal",
                fontWeight: 800,
                lineHeight: "normal",
              }}
            >
              Chats
            </Typography>
            <IconButton onClick={handleOpen}>
              <User fontSize={24} />
            </IconButton>
          </Stack>
        </Stack>
        <Divider
          sx={{
            width: "100%",
            height: "0.5px",
            background: "#B4B4B4",
            marginTop: "10px",
          }}
        />
        <Typography
          sx={{
            color: "#676667",
            fontFamily: "Manrope",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "normal",
            padding: "20px 0",
          }}
        >
          All Chats
        </Typography>
        <DirectConversion />
      </Box>
      {/*  */}
      <Friends handleClose={handleClose} open={open} />
    </Box>
  );
};

export default ChatDashboard;
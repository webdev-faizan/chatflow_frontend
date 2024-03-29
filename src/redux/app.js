import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../service/axiosInstance";
import { setting } from "../data/setting";
const initialState = {
  sideBar: {
    open: false,
    type: "CONTACT",
  },
  snackbar: {
    open: false,
    message: "",
  },
  alluser: [],
  friends: [],
  requestToConnected: [],
  roomId: null,
  sentMessageInfo: {},
  chatType: null,
  callNotifcation: {
    showNotifcation: false,
    message: "",
  },
  showVideo: false,
  showAudio: false,
};

export const Slice = createSlice({
  name: "app",
  initialState,

  reducers: {
    toggleSidebar: (state) => {
      state.sideBar.open = !state.sideBar.open;
    },
    updateSidebarTap: (state, action) => {
      window.scrollTo(0, 0);
      state.sideBar.type = action.payload.type;
    },
    showShackbar: (state, action) => {
      state.snackbar.open = action.payload.open;
      state.snackbar.message = action.payload.message;
    },
    CallNotifcation: (state, action) => {
      state.callNotifcation.showNotifcation =
        action.payload.ShowCallNotifcation;
      state.callNotifcation.message = action.payload.message;
      state.showVideo = false;
      state.showAudio = false;
    },
    allUser: (state, action) => {
      // console.log(action.payload)
      state.alluser = action.payload.allUsers;
    },
    friends: (state, action) => {
      state.friends = action.payload.friends;
    },
    requestToConnected: (state, action) => {
      state.requestToConnected = action.payload.requestToConnected;
    },
    selectConversation: (state, action) => {
      state.chatType = "individual";
      state.sentMessageInfo.roomId = action.payload.roomId;
      state.sentMessageInfo.from = action.payload.from;
    },
    showVideo: (state, action) => {
      state.showVideo = action.payload;
    },
    showAudio: (state, action) => {
      state.showAudio = action.payload;
    },
  },
});

export default Slice.reducer;

export function toggleSidebar() {
  return async (disptach) => {
    disptach(Slice.actions.toggleSidebar());
  };
}
export function updateSidebarTap(type) {
  return async (disptach) => {
    return disptach(Slice.actions.updateSidebarTap({ type }));
  };
}

export function showSnackBar(snackbarShowInfo) {
  return async (disptach) => {
    disptach(
      Slice.actions.showShackbar({
        open: snackbarShowInfo.open,
        message: snackbarShowInfo.message,
      })
    );
    setTimeout(() => {
      disptach(Slice.actions.showShackbar({ open: false, message: "" }));
    }, 5000);
  };
}
export function FetchAllUsers() {
  return async (disptach, state) => {
    try {
      await axiosInstance
        .get("/user/unconnectedusers", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((resp) => {
          return disptach(Slice.actions.allUser({ allUsers: resp.data.data }));
        });
    } catch (error) {
      console.log(error);
    }
  };
}
export function FetchFriends() {
  return async (disptach) => {
    try {
      const { data } = await axiosInstance.get("user/connectedusers", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      disptach(Slice.actions.friends({ friends: data.data }));
    } catch (error) {
      console.log(error);
    }
  };
}

export function FetchRequestToConnectedFriends() {
  return async (disptach) => {
    try {
      const { data } = await axiosInstance.get("/user/requestconnectedusers");
      console.log(data);
      disptach(
        Slice.actions.requestToConnected({ requestToConnected: data.data })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function SelectConversation({ roomId, userId }) {
  return (disptach) => {
    disptach(Slice.actions.selectConversation({ roomId, from: userId }));
  };
}
//!shwo call notifcation info
export function CallNotifcation(payload) {
  return (disptach) => {
    disptach(Slice.actions.CallNotifcation(payload));
  };
}
// show video

export function ShowVideo(payload) {
  return async (disptach) => {
    disptach(Slice.actions.showVideo(payload));
  };
}
export function ShowAudio(payload) {
  return async (disptach) => {
    disptach(Slice.actions.showAudio(payload));
  };
}

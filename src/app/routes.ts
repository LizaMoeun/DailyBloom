import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/landing";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Verify } from "./pages/verify";
import { Dashboard } from "./pages/dashboard";
import { CreateJournal } from "./pages/create-journal";
import { JournalDetail } from "./pages/journal-detail";
import { MoodHistory } from "./pages/mood-history";
import { Profile } from "./pages/profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/verify",
    Component: Verify,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/journal/new",
    Component: CreateJournal,
  },
  {
    path: "/journal/:id",
    Component: JournalDetail,
  },
  {
    path: "/mood-history",
    Component: MoodHistory,
  },
  {
    path: "/profile",
    Component: Profile,
  },
]);
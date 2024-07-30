import { useEffect } from "react";
import { validateAndDispatchJWT } from "../../Utils/JWTUtils";
import { NavLink } from "react-router-dom";
import { Box, Typography, Container, Paper, Button, Grid, Card, CardContent, Grow } from "@mui/material";
import Lottie from "lottie-react";
import vacationAnimation from "../../assets/vacation-animation.json";
import planAnimation from "../../assets/plan-animation.json";
import collectionAnimation from "../../assets/collection-animation.json";
import interfaceAnimation from "../../assets/interface-animation.json";
import updatesAnimation from "../../assets/updates-animation.json";
import securityAnimation from "../../assets/security-animation.json";
import navigationAnimation from "../../assets/navigation-animation.json";

const primaryColor = "#1e90ff"; // Dodger Blue
const secondaryColor = "#b0c4de"; // Light Steel Blue

function MainPage(): JSX.Element {
  useEffect(() => {
    validateAndDispatchJWT();
  }, []);

  return (
    <Container className="MainPage" sx={{ padding: "2rem", textAlign: "center" }}>
      <Paper elevation={3} sx={{ padding: "2rem", backgroundColor: "#1e1e1e", borderRadius: "16px" }}>
        <Grow in={true} timeout={1000}>
          <Typography variant="h2" gutterBottom sx={{ color: primaryColor }}>
            Welcome to Vacation Management
          </Typography>
        </Grow>
        <Grow in={true} timeout={1000}>
          <Typography variant="body1" paragraph sx={{ color: secondaryColor }}>
            Discover and manage your vacations with ease. Our application offers a comprehensive tool to help you plan
            and enjoy your holidays.
          </Typography>
        </Grow>
        <Box
          component="section"
          className="navigation"
          sx={{ marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <Grow in={true} timeout={1000}>
            <Box sx={{ flex: 1, textAlign: "left" }}>
              <Typography variant="h5" sx={{ color: secondaryColor }}>
                Navigate through our application to explore various vacation options, plan your trips, and manage your
                bookings effortlessly.
              </Typography>
              <Typography variant="body1" sx={{ color: secondaryColor, marginTop: "1rem" }}>
                Our user-friendly interface and comprehensive tools make it easy for you to find the perfect vacation.
                Start your journey now!
              </Typography>
              <Grow in={true} timeout={1000}>
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                  <Button
                    component={NavLink}
                    to="/vacations"
                    variant="contained"
                    sx={{ backgroundColor: primaryColor, color: "#fff" }}
                    startIcon={<Lottie animationData={vacationAnimation} style={{ width: 24, height: 24 }} />}
                  >
                    Vacations
                  </Button>
                </Box>
              </Grow>
            </Box>
          </Grow>
          <Grow in={true} timeout={1000}>
            <Box sx={{ flex: 1 }}>
              <Lottie animationData={navigationAnimation} style={{ width: "80%", height: "80%" }} />
            </Box>
          </Grow>
        </Box>
        <Box component="section" sx={{ marginBottom: "2rem" }}>
          <Grow in={true} timeout={1000}>
            <Typography variant="h4" gutterBottom sx={{ color: primaryColor }}>
              Features
            </Typography>
          </Grow>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grow in={true} timeout={1000}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#2a2a2a" }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        justifyContent: "center",
                        color: primaryColor,
                      }}
                    >
                      <Lottie animationData={vacationAnimation} style={{ width: 50, height: 50 }} /> Vacation Directory
                    </Typography>
                    <Typography variant="body2" sx={{ color: secondaryColor }}>
                      Browse through a comprehensive list of vacations. Learn about different destinations, activities,
                      and more. Discover the perfect vacation for you.
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grow in={true} timeout={1000}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#2a2a2a" }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        justifyContent: "center",
                        color: primaryColor,
                      }}
                    >
                      <Lottie animationData={planAnimation} style={{ width: 50, height: 50 }} /> Plan Your Trip
                    </Typography>
                    <Typography variant="body2" sx={{ color: secondaryColor }}>
                      Use our tools to plan your trip. Filter by destination, activities, or dates to find exactly what
                      you're looking for. Read reviews, summaries, and more to help you choose your next vacation.
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          </Grid>
        </Box>
        <Box component="section">
          <Grow in={true} timeout={1000}>
            <Typography variant="h4" gutterBottom sx={{ color: primaryColor }}>
              Why Choose Our Service?
            </Typography>
          </Grow>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grow in={true} timeout={1000}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#2a2a2a" }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        justifyContent: "center",
                        color: primaryColor,
                      }}
                    >
                      <Lottie animationData={collectionAnimation} style={{ width: 50, height: 50 }} /> Extensive
                      Collection
                    </Typography>
                    <Typography variant="body2" sx={{ color: secondaryColor }}>
                      Access a vast database of vacations from various destinations. Whether you're into beach holidays,
                      mountain adventures, or city breaks, we have something for everyone.
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grow in={true} timeout={1000}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#2a2a2a" }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        justifyContent: "center",
                        color: primaryColor,
                      }}
                    >
                      <Lottie animationData={interfaceAnimation} style={{ width: 50, height: 50 }} /> User-Friendly
                      Interface
                    </Typography>
                    <Typography variant="body2" sx={{ color: secondaryColor }}>
                      Enjoy a seamless and intuitive browsing experience. Our interface is designed to be easy to
                      navigate, even for first-time users.
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grow in={true} timeout={1000}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#2a2a2a" }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        justifyContent: "center",
                        color: primaryColor,
                      }}
                    >
                      <Lottie animationData={updatesAnimation} style={{ width: 50, height: 50 }} /> Real-Time Updates
                    </Typography>
                    <Typography variant="body2" sx={{ color: secondaryColor }}>
                      Get the latest information on vacation availability and new offers. Our system is updated in
                      real-time to ensure you have the most current information.
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grow in={true} timeout={1000}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#2a2a2a" }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        justifyContent: "center",
                        color: primaryColor,
                      }}
                    >
                      <Lottie animationData={securityAnimation} style={{ width: 50, height: 50 }} /> Secure and Reliable
                    </Typography>
                    <Typography variant="body2" sx={{ color: secondaryColor }}>
                      Trust in our secure platform to protect your data and privacy. We use the latest security measures
                      to ensure your information is safe.
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default MainPage;

// import { useEffect } from "react";
// import { validateAndDispatchJWT } from "../../Utils/JWTUtils";
// import { NavLink } from "react-router-dom";
// import { Box, Typography, Container, Paper, Button, Grid, Card, CardContent, Grow } from "@mui/material";
// import VacationIcon from "@mui/icons-material/BeachAccess";
// import PlanIcon from "@mui/icons-material/EventAvailable";
// import CollectionIcon from "@mui/icons-material/Collections";
// import InterfaceIcon from "@mui/icons-material/TouchApp";
// import UpdatesIcon from "@mui/icons-material/Update";
// import SecurityIcon from "@mui/icons-material/Security";

// function MainPage(): JSX.Element {
//   useEffect(() => {
//     validateAndDispatchJWT();
//   }, []);

//   return (
//     <Container className="MainPage" sx={{ padding: "2rem", textAlign: "center" }}>
//       <Paper elevation={3} sx={{ padding: "2rem", backgroundColor: "#1e1e1e", borderRadius: "16px" }}>
//         <Typography variant="h2" gutterBottom color="primary">
//           Welcome to Vacation Management
//         </Typography>
//         <Typography variant="body1" paragraph color="text.secondary">
//           Discover and manage your vacations with ease. Our application offers a comprehensive tool to help you plan and
//           enjoy your holidays.
//         </Typography>
//         <Box component="section" className="navigation" sx={{ marginBottom: "2rem" }}>
//           <Typography variant="h4" gutterBottom color="primary">
//             Navigation
//           </Typography>
//           <Box className="nav-links" sx={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
//             <Button
//               component={NavLink}
//               to="/vacations"
//               variant="contained"
//               color="primary"
//               startIcon={<VacationIcon />}
//             >
//               Vacations
//             </Button>
//           </Box>
//         </Box>
//         <Box component="section" sx={{ marginBottom: "2rem" }}>
//           <Typography variant="h4" gutterBottom color="primary">
//             Features
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <Grow in={true} timeout={1000}>
//                 <Card sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#2a2a2a" }}>
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography
//                       variant="h5"
//                       component="div"
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.5rem",
//                         justifyContent: "center",
//                         color: "#ffb74d",
//                       }}
//                     >
//                       <VacationIcon /> Vacation Directory
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Browse through a comprehensive list of vacations. Learn about different destinations, activities,
//                       and more. Discover the perfect vacation for you.
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grow>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Grow in={true} timeout={1000}>
//                 <Card sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#2a2a2a" }}>
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography
//                       variant="h5"
//                       component="div"
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.5rem",
//                         justifyContent: "center",
//                         color: "#ffb74d",
//                       }}
//                     >
//                       <PlanIcon /> Plan Your Trip
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Use our tools to plan your trip. Filter by destination, activities, or dates to find exactly what
//                       you're looking for. Read reviews, summaries, and more to help you choose your next vacation.
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grow>
//             </Grid>
//           </Grid>
//         </Box>
//         <Box component="section">
//           <Typography variant="h4" gutterBottom color="primary">
//             Why Choose Our Service?
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <Grow in={true} timeout={1000}>
//                 <Card sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#2a2a2a" }}>
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography
//                       variant="h5"
//                       component="div"
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.5rem",
//                         justifyContent: "center",
//                         color: "#ffb74d",
//                       }}
//                     >
//                       <CollectionIcon /> Extensive Collection
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Access a vast database of vacations from various destinations. Whether you're into beach holidays,
//                       mountain adventures, or city breaks, we have something for everyone.
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grow>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Grow in={true} timeout={1000}>
//                 <Card sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#2a2a2a" }}>
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography
//                       variant="h5"
//                       component="div"
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.5rem",
//                         justifyContent: "center",
//                         color: "#ffb74d",
//                       }}
//                     >
//                       <InterfaceIcon /> User-Friendly Interface
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Enjoy a seamless and intuitive browsing experience. Our interface is designed to be easy to
//                       navigate, even for first-time users.
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grow>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Grow in={true} timeout={1000}>
//                 <Card sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#2a2a2a" }}>
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography
//                       variant="h5"
//                       component="div"
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.5rem",
//                         justifyContent: "center",
//                         color: "#ffb74d",
//                       }}
//                     >
//                       <UpdatesIcon /> Real-Time Updates
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Get the latest information on vacation availability and new offers. Our system is updated in
//                       real-time to ensure you have the most current information.
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grow>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Grow in={true} timeout={1000}>
//                 <Card sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#2a2a2a" }}>
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography
//                       variant="h5"
//                       component="div"
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.5rem",
//                         justifyContent: "center",
//                         color: "#ffb74d",
//                       }}
//                     >
//                       <SecurityIcon /> Secure and Reliable
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Trust in our secure platform to protect your data and privacy. We use the latest security measures
//                       to ensure your information is safe.
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grow>
//             </Grid>
//           </Grid>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }

// export default MainPage;

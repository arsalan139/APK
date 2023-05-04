import {
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { English } from "./language";
const useStyles = makeStyles((theme) => ({
  row: {
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
}));

const LanguageFields = ({ text, setText }) => {
  const classes = useStyles();
  return (
    <div>
      {/* Home */}
      <Paper elevation={8} style={{ margin: 12, padding: 20 }}>
        <Typography align="center" variant="h5" style={{ marginBlock: 20 }}>
          Home
        </Typography>
        <Grid container className={classes.row} spacing={3}>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.home.title}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.home.title}
              placeholder={English.home.title}
              value={text.terms.home.title}
              onChange={(e) => {
                let a = { ...text };
                a.terms.home.title = e.target.value;
                setText(a);
              }}
              style={{ width: "100%" }}
              variant="outlined"
              size="medium"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" className={{ marginInline: 14 }}>
              {English.home.subheading}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.home.subheading}
              placeholder={English.home.subheading}
              value={text.terms.home.subheading}
              onChange={(e) => {
                let a = { ...text };
                a.terms.home.subheading = e.target.value;
                setText(a);
              }}
              style={{ width: "100%" }}
              variant="outlined"
              size="medium"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Selected Category */}
      <Paper elevation={8} style={{ margin: 12, padding: 20 }}>
        <Typography align="center" variant="h5" style={{ marginBlock: 20 }}>
          Selected Category
        </Typography>
        <Grid container className={classes.row} spacing={3}>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 12 }}>
              {English.selected_category.order}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.selected_category.order}
              placeholder={English.selected_category.order}
              value={text.terms.selected_category.order}
              onChange={(e) => {
                let a = { ...text };
                a.terms.selected_category.order = e.target.value;
                setText(a);
              }}
              style={{ width: "100%" }}
              variant="outlined"
              size="medium"
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Paper>

      {/* Drawer Options */}
      <Paper elevation={8} style={{ margin: 12, padding: 20 }}>
        <Typography align="center" variant="h5" style={{ marginBlock: 20 }}>
          Drawer Options
        </Typography>
        <Grid container className={classes.row} spacing={3}>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.drawer.home}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.drawer.home}
              placeholder={English.drawer.home}
              value={text.terms.drawer.home}
              onChange={(e) => {
                let a = { ...text };
                a.terms.drawer.home = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.drawer.application}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.drawer.application}
              placeholder={English.drawer.application}
              value={text.terms.drawer.application}
              onChange={(e) => {
                let a = { ...text };
                a.terms.drawer.application = e.target.value;
                setText(a);
              }}
              variant="outlined"
              style={{ width: "100%" }}
              size="medium"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.drawer.language}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.drawer.language}
              placeholder={English.drawer.language}
              value={text.terms.drawer.language}
              onChange={(e) => {
                let a = { ...text };
                a.terms.drawer.language = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.drawer.profile}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.drawer.profile}
              placeholder={English.drawer.profile}
              value={text.terms.drawer.profile}
              onChange={(e) => {
                let a = { ...text };
                a.terms.drawer.profile = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.drawer.sign_out}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.drawer.sign_out}
              placeholder={English.drawer.sign_out}
              value={text.terms.drawer.sign_out}
              onChange={(e) => {
                let a = { ...text };
                a.terms.drawer.sign_out = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Paper>

      {/* Language */}
      <Paper elevation={8} style={{ margin: 12, padding: 20 }}>
        <Typography align="center" variant="h5" style={{ marginBlock: 20 }}>
          Language
        </Typography>
        <Grid container className={classes.row} spacing={3}>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.language.title}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.language.title}
              placeholder={English.language.title}
              value={text.terms.language.title}
              onChange={(e) => {
                let a = { ...text };
                a.terms.language.title = e.target.value;
                setText(a);
              }}
              style={{ width: "100%" }}
              variant="outlined"
              size="medium"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.language.subheading}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.language.subheading}
              placeholder={English.language.subheading}
              value={text.terms.language.subheading}
              onChange={(e) => {
                let a = { ...text };
                a.terms.language.subheading = e.target.value;
                setText(a);
              }}
              style={{ width: "100%" }}
              variant="outlined"
              size="medium"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Application */}
      <Paper elevation={8} style={{ margin: 12, padding: 20 }}>
        <Typography align="center" variant="h5" style={{ marginBlock: 20 }}>
          Application
        </Typography>
        <Grid container className={classes.row} spacing={3}>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.application.title}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.application.title}
              placeholder={English.application.title}
              value={text.terms.application.title}
              onChange={(e) => {
                let a = { ...text };
                a.terms.application.title = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.application.category}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.application.category}
              placeholder={English.application.category}
              value={text.terms.application.category}
              onChange={(e) => {
                let a = { ...text };
                a.terms.application.category = e.target.value;
                setText(a);
              }}
              variant="outlined"
              style={{ width: "100%" }}
              size="medium"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.application.upload_image}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.application.upload_image}
              placeholder={English.application.upload_image}
              value={text.terms.application.upload_image}
              onChange={(e) => {
                let a = { ...text };
                a.terms.application.upload_image = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.application.upload_cnic_front}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.application.upload_cnic_front}
              placeholder={English.application.upload_cnic_front}
              value={text.terms.application.upload_cnic_front}
              onChange={(e) => {
                let a = { ...text };
                a.terms.application.upload_cnic_front = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.application.upload_cnic_back}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.application.upload_cnic_back}
              placeholder={English.application.upload_cnic_back}
              value={text.terms.application.upload_cnic_back}
              onChange={(e) => {
                let a = { ...text };
                a.terms.application.upload_cnic_back = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.application.cnic_number}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.application.cnic_number}
              placeholder={English.application.cnic_number}
              value={text.terms.application.cnic_number}
              onChange={(e) => {
                let a = { ...text };
                a.terms.application.cnic_number = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.application.parent_cinc}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.application.parent_cinc}
              placeholder={English.application.parent_cinc}
              value={text.terms.application.parent_cinc}
              onChange={(e) => {
                let a = { ...text };
                a.terms.application.parent_cinc = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.application.address}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.application.address}
              placeholder={English.application.address}
              value={text.terms.application.address}
              onChange={(e) => {
                let a = { ...text };
                a.terms.application.address = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.application.submit_form}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.application.submit_form}
              placeholder={English.application.submit_form}
              value={text.terms.application.submit_form}
              onChange={(e) => {
                let a = { ...text };
                a.terms.application.submit_form = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.application.city}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.application.city}
              placeholder={English.application.city}
              value={text.terms.application.city}
              onChange={(e) => {
                let a = { ...text };
                a.terms.application.city = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.application.working_rate}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.application.working_rate}
              placeholder={English.application.working_rate}
              value={text.terms.application.working_rate}
              onChange={(e) => {
                let a = { ...text };
                a.terms.application.working_rate = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Paper>

      {/* Profile */}
      <Paper elevation={8} style={{ margin: 12, padding: 20 }}>
        <Typography align="center" variant="h5" style={{ marginBlock: 20 }}>
          Profile
        </Typography>
        <Grid container className={classes.row} spacing={3}>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.profile.placed_task}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.profile.placed_task}
              placeholder={English.profile.placed_task}
              value={text.terms.profile.placed_task}
              onChange={(e) => {
                let a = { ...text };
                a.terms.profile.placed_task = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.profile.assigned_task}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.profile.assigned_task}
              placeholder={English.profile.assigned_task}
              value={text.terms.profile.assigned_task}
              onChange={(e) => {
                let a = { ...text };
                a.terms.profile.assigned_task = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.profile.wallet}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.profile.wallet}
              placeholder={English.profile.wallet}
              value={text.terms.profile.wallet}
              onChange={(e) => {
                let a = { ...text };
                a.terms.profile.wallet = e.target.value;
                setText(a);
              }}
              variant="outlined"
              style={{ width: "100%" }}
              size="medium"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.profile.history}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.profile.history}
              placeholder={English.profile.history}
              value={text.terms.profile.history}
              onChange={(e) => {
                let a = { ...text };
                a.terms.profile.history = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.profile.reviews}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.profile.reviews}
              placeholder={English.profile.reviews}
              value={text.terms.profile.reviews}
              onChange={(e) => {
                let a = { ...text };
                a.terms.profile.reviews = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.profile.online_training}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.profile.online_training}
              placeholder={English.profile.online_training}
              value={text.terms.profile.online_training}
              onChange={(e) => {
                let a = { ...text };
                a.terms.profile.online_training = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.profile.notification}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.profile.notification}
              placeholder={English.profile.notification}
              value={text.terms.profile.notification}
              onChange={(e) => {
                let a = { ...text };
                a.terms.profile.notification = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.profile.setting}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.profile.setting}
              placeholder={English.profile.setting}
              value={text.terms.profile.setting}
              onChange={(e) => {
                let a = { ...text };
                a.terms.profile.setting = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.profile.sign_out}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.profile.sign_out}
              placeholder={English.profile.sign_out}
              value={text.terms.profile.sign_out}
              onChange={(e) => {
                let a = { ...text };
                a.terms.profile.sign_out = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.profile.promo}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.profile.promo}
              placeholder={English.profile.promo}
              value={text.terms.profile.promo}
              onChange={(e) => {
                let a = { ...text };
                a.terms.profile.promo = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.profile.favorites}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.profile.favorites}
              placeholder={English.profile.favorites}
              value={text.terms.profile.favorites}
              onChange={(e) => {
                let a = { ...text };
                a.terms.profile.favorites = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Paper>

      {/* Promo*/}
      <Paper elevation={8} style={{ margin: 12, padding: 20 }}>
        <Typography align="center" variant="h5" style={{ marginBlock: 20 }}>
          Promo
        </Typography>
        <Grid container className={classes.row} spacing={3}>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.promo.title}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.promo.title}
              placeholder={English.promo.title}
              value={text.terms.promo.title}
              onChange={(e) => {
                let a = { ...text };
                a.terms.promo.title = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.promo.expires}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.promo.expires}
              placeholder={English.promo.expires}
              value={text.terms.promo.expires}
              onChange={(e) => {
                let a = { ...text };
                a.terms.promo.expires = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.promo.status}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.promo.status}
              placeholder={English.promo.status}
              value={text.terms.promo.status}
              onChange={(e) => {
                let a = { ...text };
                a.terms.promo.status = e.target.value;
                setText(a);
              }}
              variant="outlined"
              style={{ width: "100%" }}
              size="medium"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.promo.used}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.promo.used}
              placeholder={English.promo.used}
              value={text.terms.promo.used}
              onChange={(e) => {
                let a = { ...text };
                a.terms.promo.used = e.target.value;
                setText(a);
              }}
              variant="outlined"
              style={{ width: "100%" }}
              size="medium"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.promo.not_used}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.promo.not_used}
              placeholder={English.promo.not_used}
              value={text.terms.promo.not_used}
              onChange={(e) => {
                let a = { ...text };
                a.terms.promo.not_used = e.target.value;
                setText(a);
              }}
              variant="outlined"
              style={{ width: "100%" }}
              size="medium"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.promo.expired}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.promo.expired}
              placeholder={English.promo.expired}
              value={text.terms.promo.expired}
              onChange={(e) => {
                let a = { ...text };
                a.terms.promo.expired = e.target.value;
                setText(a);
              }}
              variant="outlined"
              style={{ width: "100%" }}
              size="medium"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.promo.not_expired}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.promo.not_expired}
              placeholder={English.promo.not_expired}
              value={text.terms.promo.not_expired}
              onChange={(e) => {
                let a = { ...text };
                a.terms.promo.not_expired = e.target.value;
                setText(a);
              }}
              variant="outlined"
              style={{ width: "100%" }}
              size="medium"
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Paper>

      {/* Placed Task */}
      <Paper elevation={8} style={{ margin: 12, padding: 20 }}>
        <Typography align="center" variant="h5" style={{ marginBlock: 20 }}>
          Palaced Task
        </Typography>
        <Grid container className={classes.row} spacing={3}>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.placedTask.title}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.placedTask.title}
              placeholder={English.placedTask.title}
              value={text.terms.placedTask.title}
              onChange={(e) => {
                let a = { ...text };
                a.terms.placedTask.title = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.placedTask.my_task}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.placedTask.my_task}
              placeholder={English.placedTask.my_task}
              value={text.terms.placedTask.my_task}
              onChange={(e) => {
                let a = { ...text };
                a.terms.placedTask.my_task = e.target.value;
                setText(a);
              }}
              variant="outlined"
              style={{ width: "100%" }}
              size="medium"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.placedTask.assigned_task}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.placedTask.assigned_task}
              placeholder={English.placedTask.assigned_task}
              value={text.terms.placedTask.assigned_task}
              onChange={(e) => {
                let a = { ...text };
                a.terms.placedTask.assigned_task = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.placedTask.view_details}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.placedTask.view_details}
              placeholder={English.placedTask.view_details}
              value={text.terms.placedTask.view_details}
              onChange={(e) => {
                let a = { ...text };
                a.terms.placedTask.view_details = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.placedTask.accept}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.placedTask.accept}
              placeholder={English.placedTask.accept}
              value={text.terms.placedTask.accept}
              onChange={(e) => {
                let a = { ...text };
                a.terms.placedTask.accept = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.placedTask.reject}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.placedTask.reject}
              placeholder={English.placedTask.reject}
              value={text.terms.placedTask.reject}
              onChange={(e) => {
                let a = { ...text };
                a.terms.placedTask.reject = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.placedTask.cancel}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.placedTask.cancel}
              placeholder={English.placedTask.cancel}
              value={text.terms.placedTask.cancel}
              onChange={(e) => {
                let a = { ...text };
                a.terms.placedTask.cancel = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.placedTask.price}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.placedTask.price}
              placeholder={English.placedTask.price}
              value={text.terms.placedTask.price}
              onChange={(e) => {
                let a = { ...text };
                a.terms.placedTask.price = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.placedTask.hours}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.placedTask.hours}
              placeholder={English.placedTask.hours}
              value={text.terms.placedTask.hours}
              onChange={(e) => {
                let a = { ...text };
                a.terms.placedTask.hours = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Paper>

      {/* Order Details */}
      <Paper elevation={8} style={{ margin: 12, padding: 20 }}>
        <Typography align="center" variant="h5" style={{ marginBlock: 20 }}>
          Order Details
        </Typography>
        <Grid container className={classes.row} spacing={3}>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.task_details.title}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.task_details.title}
              placeholder={English.task_details.title}
              value={text.terms.task_details.title}
              onChange={(e) => {
                let a = { ...text };
                a.terms.task_details.title = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.task_details.subheading}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.task_details.subheading}
              placeholder={English.task_details.subheading}
              value={text.terms.task_details.subheading}
              onChange={(e) => {
                let a = { ...text };
                a.terms.task_details.subheading = e.target.value;
                setText(a);
              }}
              variant="outlined"
              style={{ width: "100%" }}
              size="medium"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.task_details.order_from}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.task_details.order_from}
              placeholder={English.task_details.order_from}
              value={text.terms.task_details.order_from}
              onChange={(e) => {
                let a = { ...text };
                a.terms.task_details.order_from = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.task_details.order_to}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.task_details.order_to}
              placeholder={English.task_details.order_to}
              value={text.terms.task_details.order_to}
              onChange={(e) => {
                let a = { ...text };
                a.terms.task_details.order_to = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.task_details.phone}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.task_details.phone}
              placeholder={English.task_details.phone}
              value={text.terms.task_details.phone}
              onChange={(e) => {
                let a = { ...text };
                a.terms.task_details.phone = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.task_details.gender}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.task_details.gender}
              placeholder={English.task_details.gender}
              value={text.terms.task_details.gender}
              onChange={(e) => {
                let a = { ...text };
                a.terms.task_details.gender = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.task_details.chat}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.task_details.chat}
              placeholder={English.task_details.chat}
              value={text.terms.task_details.chat}
              onChange={(e) => {
                let a = { ...text };
                a.terms.task_details.chat = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.task_details.complain}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.task_details.complain}
              placeholder={English.task_details.complain}
              value={text.terms.task_details.complain}
              onChange={(e) => {
                let a = { ...text };
                a.terms.task_details.complain = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.task_details.price}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.task_details.price}
              placeholder={English.task_details.price}
              value={text.terms.task_details.price}
              onChange={(e) => {
                let a = { ...text };
                a.terms.task_details.price = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.task_details.hours}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.task_details.hours}
              placeholder={English.task_details.hours}
              value={text.terms.task_details.hours}
              onChange={(e) => {
                let a = { ...text };
                a.terms.task_details.hours = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.task_details.status}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.task_details.status}
              placeholder={English.task_details.status}
              value={text.terms.task_details.status}
              onChange={(e) => {
                let a = { ...text };
                a.terms.task_details.status = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.task_details.worker_status}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.task_details.worker_status}
              placeholder={English.task_details.worker_status}
              value={text.terms.task_details.worker_status}
              onChange={(e) => {
                let a = { ...text };
                a.terms.task_details.worker_status = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.task_details.commission}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.task_details.commission}
              placeholder={English.task_details.commission}
              value={text.terms.task_details.commission}
              onChange={(e) => {
                let a = { ...text };
                a.terms.task_details.commission = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.task_details.address}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.task_details.address}
              placeholder={English.task_details.address}
              value={text.terms.task_details.address}
              onChange={(e) => {
                let a = { ...text };
                a.terms.task_details.address = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.task_details.completed}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.task_details.completed}
              placeholder={English.task_details.completed}
              value={text.terms.task_details.completed}
              onChange={(e) => {
                let a = { ...text };
                a.terms.task_details.completed = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.task_details.description}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.task_details.description}
              placeholder={English.task_details.description}
              value={text.terms.task_details.description}
              onChange={(e) => {
                let a = { ...text };
                a.terms.task_details.description = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Paper>

      {/* Complaint */}
      <Paper elevation={8} style={{ margin: 12, padding: 20 }}>
        <Typography align="center" variant="h5" style={{ marginBlock: 20 }}>
          Complaint
        </Typography>
        <Grid container className={classes.row} spacing={3}>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.complaint.title}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.complaint.title}
              placeholder={English.complaint.title}
              value={text.terms.complaint.title}
              onChange={(e) => {
                let a = { ...text };
                a.terms.complaint.title = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.complaint.subheading}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.complaint.subheading}
              placeholder={English.complaint.subheading}
              value={text.terms.complaint.subheading}
              onChange={(e) => {
                let a = { ...text };
                a.terms.complaint.subheading = e.target.value;
                setText(a);
              }}
              variant="outlined"
              style={{ width: "100%" }}
              size="medium"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.complaint.complaint_to}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.complaint.complaint_to}
              placeholder={English.complaint.complaint_to}
              value={text.terms.complaint.complaint_to}
              onChange={(e) => {
                let a = { ...text };
                a.terms.complaint.complaint_to = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.complaint.phone}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.complaint.phone}
              placeholder={English.complaint.phone}
              value={text.terms.complaint.phone}
              onChange={(e) => {
                let a = { ...text };
                a.terms.complaint.phone = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.complaint.gender}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.complaint.gender}
              placeholder={English.complaint.gender}
              value={text.terms.complaint.gender}
              onChange={(e) => {
                let a = { ...text };
                a.terms.complaint.gender = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.complaint.submit}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.complaint.submit}
              placeholder={English.complaint.submit}
              value={text.terms.complaint.submit}
              onChange={(e) => {
                let a = { ...text };
                a.terms.complaint.submit = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Wallet */}
      <Paper elevation={8} style={{ margin: 12, padding: 20 }}>
        <Typography align="center" variant="h5" style={{ marginBlock: 20 }}>
          Wallet
        </Typography>
        <Grid container className={classes.row} spacing={3}>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.wallet.title}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.wallet.title}
              placeholder={English.wallet.title}
              value={text.terms.wallet.title}
              onChange={(e) => {
                let a = { ...text };
                a.terms.wallet.title = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.wallet.current_wallet}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.wallet.current_wallet}
              placeholder={English.wallet.current_wallet}
              value={text.terms.wallet.current_wallet}
              onChange={(e) => {
                let a = { ...text };
                a.terms.wallet.current_wallet = e.target.value;
                setText(a);
              }}
              variant="outlined"
              style={{ width: "100%" }}
              size="medium"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.wallet.add_wallet}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.wallet.add_wallet}
              placeholder={English.wallet.add_wallet}
              value={text.terms.wallet.add_wallet}
              onChange={(e) => {
                let a = { ...text };
                a.terms.wallet.add_wallet = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.wallet.pending_amount}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.wallet.pending_amount}
              placeholder={English.wallet.pending_amount}
              value={text.terms.wallet.pending_amount}
              onChange={(e) => {
                let a = { ...text };
                a.terms.wallet.pending_amount = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.wallet.amount}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.wallet.amount}
              placeholder={English.wallet.amount}
              value={text.terms.wallet.amount}
              onChange={(e) => {
                let a = { ...text };
                a.terms.wallet.amount = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.wallet.pay}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.wallet.pay}
              placeholder={English.wallet.pay}
              value={text.terms.wallet.pay}
              onChange={(e) => {
                let a = { ...text };
                a.terms.wallet.pay = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Add Wallet */}
      <Paper elevation={8} style={{ margin: 12, padding: 20 }}>
        <Typography align="center" variant="h5" style={{ marginBlock: 20 }}>
          Add Wallet
        </Typography>
        <Grid container className={classes.row} spacing={3}>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.add_wallet.title}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.add_wallet.title}
              placeholder={English.add_wallet.title}
              value={text.terms.add_wallet.title}
              onChange={(e) => {
                let a = { ...text };
                a.terms.add_wallet.title = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.add_wallet.add}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.add_wallet.add}
              placeholder={English.add_wallet.add}
              value={text.terms.add_wallet.add}
              onChange={(e) => {
                let a = { ...text };
                a.terms.add_wallet.add = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.wallet.amount}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.add_wallet.amount}
              placeholder={English.add_wallet.amount}
              value={text.terms.add_wallet.amount}
              onChange={(e) => {
                let a = { ...text };
                a.terms.add_wallet.amount = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Paper>

      {/* History */}
      <Paper elevation={8} style={{ margin: 12, padding: 20 }}>
        <Typography align="center" variant="h5" style={{ marginBlock: 20 }}>
          History
        </Typography>
        <Grid container className={classes.row} spacing={3}>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.history.title}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.history.title}
              placeholder={English.history.title}
              value={text.terms.history.title}
              onChange={(e) => {
                let a = { ...text };
                a.terms.history.title = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.history.my_task}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.history.my_task}
              placeholder={English.history.my_task}
              value={text.terms.history.my_task}
              onChange={(e) => {
                let a = { ...text };
                a.terms.history.my_task = e.target.value;
                setText(a);
              }}
              variant="outlined"
              style={{ width: "100%" }}
              size="medium"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.history.assigned_task}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.history.assigned_task}
              placeholder={English.history.assigned_task}
              value={text.terms.history.assigned_task}
              onChange={(e) => {
                let a = { ...text };
                a.terms.history.assigned_task = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.history.view_details}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.history.view_details}
              placeholder={English.history.view_details}
              value={text.terms.history.view_details}
              onChange={(e) => {
                let a = { ...text };
                a.terms.history.view_details = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.history.price}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.history.price}
              placeholder={English.history.price}
              value={text.terms.history.price}
              onChange={(e) => {
                let a = { ...text };
                a.terms.history.price = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.history.hours}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.history.hours}
              placeholder={English.history.hours}
              value={text.terms.history.hours}
              onChange={(e) => {
                let a = { ...text };
                a.terms.history.hours = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Reviews */}
      <Paper elevation={8} style={{ margin: 12, padding: 20 }}>
        <Typography align="center" variant="h5" style={{ marginBlock: 20 }}>
          Reviews
        </Typography>
        <Grid container className={classes.row} spacing={3}>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 12 }}>
              {English.reviews.title}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.reviews.title}
              placeholder={English.reviews.title}
              value={text.terms.reviews.title}
              onChange={(e) => {
                let a = { ...text };
                a.terms.reviews.title = e.target.value;
                setText(a);
              }}
              style={{ width: "100%" }}
              variant="outlined"
              size="medium"
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Paper>

      {/* Online Training*/}
      <Paper elevation={8} style={{ margin: 12, padding: 20 }}>
        <Typography align="center" variant="h5" style={{ marginBlock: 20 }}>
          Online Training
        </Typography>
        <Grid container className={classes.row} spacing={3}>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 12 }}>
              {English.online_training.title}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.online_training.title}
              placeholder={English.online_training.title}
              value={text.terms.online_training.title}
              onChange={(e) => {
                let a = { ...text };
                a.terms.online_training.title = e.target.value;
                setText(a);
              }}
              style={{ width: "100%" }}
              variant="outlined"
              size="medium"
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Paper>

      {/* Selected Category */}
      <Paper elevation={8} style={{ margin: 12, padding: 20 }}>
        <Typography align="center" variant="h5" style={{ marginBlock: 20 }}>
          Selected Category
        </Typography>
        <Grid container className={classes.row} spacing={3}>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 12 }}>
              {English.notification.title}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.notification.title}
              placeholder={English.notification.title}
              value={text.terms.notification.title}
              onChange={(e) => {
                let a = { ...text };
                a.terms.notification.title = e.target.value;
                setText(a);
              }}
              style={{ width: "100%" }}
              variant="outlined"
              size="medium"
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Paper>

      {/* Setting */}
      <Paper elevation={8} style={{ margin: 12, padding: 20 }}>
        <Typography align="center" variant="h5" style={{ marginBlock: 20 }}>
          Setting
        </Typography>
        <Grid container className={classes.row} spacing={3}>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.setting.title}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.setting.title}
              placeholder={English.setting.title}
              value={text.terms.setting.title}
              onChange={(e) => {
                let a = { ...text };
                a.terms.setting.title = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.setting.subheading}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.setting.subheading}
              placeholder={English.setting.subheading}
              value={text.terms.setting.subheading}
              onChange={(e) => {
                let a = { ...text };
                a.terms.setting.subheading = e.target.value;
                setText(a);
              }}
              variant="outlined"
              style={{ width: "100%" }}
              size="medium"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.setting.name}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.setting.name}
              placeholder={English.setting.name}
              value={text.terms.setting.name}
              onChange={(e) => {
                let a = { ...text };
                a.terms.setting.name = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.setting.email}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.setting.email}
              placeholder={English.setting.email}
              value={text.terms.setting.email}
              onChange={(e) => {
                let a = { ...text };
                a.terms.setting.email = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.setting.phone}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.setting.phone}
              placeholder={English.setting.phone}
              value={text.terms.setting.phone}
              onChange={(e) => {
                let a = { ...text };
                a.terms.setting.phone = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.setting.dob}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.setting.dob}
              placeholder={English.setting.dob}
              value={text.terms.setting.dob}
              onChange={(e) => {
                let a = { ...text };
                a.terms.setting.dob = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.setting.verify}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.setting.verify}
              placeholder={English.setting.verify}
              value={text.terms.setting.verify}
              onChange={(e) => {
                let a = { ...text };
                a.terms.setting.verify = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.setting.update_profile}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.setting.update_profile}
              placeholder={English.setting.update_profile}
              value={text.terms.setting.update_profile}
              onChange={(e) => {
                let a = { ...text };
                a.terms.setting.update_profile = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.setting.new_password}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.setting.new_password}
              placeholder={English.setting.new_password}
              value={text.terms.setting.new_password}
              onChange={(e) => {
                let a = { ...text };
                a.terms.setting.new_password = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.setting.confirm_password}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.setting.confirm_password}
              placeholder={English.setting.confirm_password}
              value={text.terms.setting.confirm_password}
              onChange={(e) => {
                let a = { ...text };
                a.terms.setting.confirm_password = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.setting.change_password}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.setting.change_password}
              placeholder={English.setting.change_password}
              value={text.terms.setting.change_password}
              onChange={(e) => {
                let a = { ...text };
                a.terms.setting.change_password = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Paper>

      {/* Add Order */}
      <Paper elevation={8} style={{ margin: 12, padding: 20 }}>
        <Typography align="center" variant="h5" style={{ marginBlock: 20 }}>
          Add Order
        </Typography>
        <Grid container className={classes.row} spacing={3}>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.add_order.title}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.add_order.title}
              placeholder={English.add_order.title}
              value={text.terms.add_order.title}
              onChange={(e) => {
                let a = { ...text };
                a.terms.add_order.title = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.add_order.subheading}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.add_order.subheading}
              placeholder={English.add_order.subheading}
              value={text.terms.add_order.subheading}
              onChange={(e) => {
                let a = { ...text };
                a.terms.add_order.subheading = e.target.value;
                setText(a);
              }}
              variant="outlined"
              style={{ width: "100%" }}
              size="medium"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.add_order.gender}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.add_order.gender}
              placeholder={English.add_order.gender}
              value={text.terms.add_order.gender}
              onChange={(e) => {
                let a = { ...text };
                a.terms.add_order.gender = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.add_order.male}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.add_order.male}
              placeholder={English.add_order.male}
              value={text.terms.add_order.male}
              onChange={(e) => {
                let a = { ...text };
                a.terms.add_order.male = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.add_order.female}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.add_order.female}
              placeholder={English.add_order.female}
              value={text.terms.add_order.female}
              onChange={(e) => {
                let a = { ...text };
                a.terms.add_order.female = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.add_order.price}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.add_order.price}
              placeholder={English.add_order.price}
              value={text.terms.add_order.price}
              onChange={(e) => {
                let a = { ...text };
                a.terms.add_order.price = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.add_order.working_hour}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.add_order.working_hour}
              placeholder={English.add_order.working_hour}
              value={text.terms.add_order.working_hour}
              onChange={(e) => {
                let a = { ...text };
                a.terms.add_order.working_hour = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.add_order.address}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.add_order.address}
              placeholder={English.add_order.address}
              value={text.terms.add_order.address}
              onChange={(e) => {
                let a = { ...text };
                a.terms.add_order.address = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={{ marginInline: 14 }}>
              {English.add_order.place_order}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={English.add_order.place_order}
              placeholder={English.add_order.place_order}
              value={text.terms.add_order.place_order}
              onChange={(e) => {
                let a = { ...text };
                a.terms.add_order.place_order = e.target.value;
                setText(a);
              }}
              variant="outlined"
              size="medium"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default LanguageFields;

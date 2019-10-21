import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import AppPaper from "../../../../components/AppPaper"
import { Grid, Button, Table, TableBody, TableHead, TableCell, TableRow} from "@material-ui/core"
import Typography from "@material-ui/core/Typography";
import {InputOutlined,Link as LinkURL} from "@material-ui/icons"
import AppInput from "../../../../components/AppInput"
const styles = {

}



class SEO extends React.Component{

    render (){

        console.log(this.props)
        let {product}= this.props
       return (
          <Grid container>
              <Grid item sm={12}>
                  <AppPaper title={"SEO"} actions={<Button size={"small"} variant={"contained"}>Activate</Button>}>
                      <Grid container justify={"space-between"} spacing={16}>
                          <Grid item xs={12} md={6}>
                              <Typography variant={"subheading"}> SEO Properties</Typography>
                              <Typography variant={"caption"}>Generated from product properties</Typography>
                              {/*
                              -Name
                              -Description
                              -Alt name
                              -Image
                              -Url
                              -isRelatedTo
                              -itemCondition
                              -color
                              -category
                              -brand*/}

                            <Table>
                                <TableHead>
                                <TableRow>
                                    <TableCell>Proerty name</TableCell>
                                    <TableCell>Property Value</TableCell>
                                    </TableRow>
                                    </TableHead>
                                <TableBody>

                                <TableRow>
                                    <TableCell>Product name</TableCell>
                                    <TableCell>{product.title  || "value" }</TableCell>
                                    </TableRow>

                                    <TableRow>
                                    <TableCell>Product description</TableCell>
                                    <TableCell>{product.description || "value" }</TableCell>
                                    </TableRow>


                                    <TableRow>
                                    <TableCell>Product category</TableCell>
                                    <TableCell>Value</TableCell>
                                    </TableRow>


                                    <TableRow><TableCell>Product image</TableCell>
                                    <TableCell>Property Value</TableCell>
                                    </TableRow>
                                    </TableBody>
                                </Table>
                          </Grid>

                          <Grid item xs={12} md={6}>
                              <Typography variant={"subheading"} align={"center"}> SEO Preview</Typography>
                              <Typography variant={"caption"} align={"center"}>What it looks like on the web</Typography>

                              <div style={{border:"1px solid gray", padding:12, height: 200, borderRadius: 12, marginTop:12}}>

                              </div>

                          </Grid>
                      </Grid>
                  </AppPaper>
              </Grid>
          </Grid>
       )

    }

}


export  default  withStyles(styles)(SEO)
<img align="right" src="https://github.com/jjsayleraxio/AxioShiny/blob/master/images/axio-logo.png">
<br><br>

# AxioLocusZoom + SBG Modifications
R ShinyApp HTMLWidget using the locuszoom.js library.  
This version is an upgrade to the original AxioLocusZoom package (https://github.com/jjsayleraxio/AxioLocusZoom).
Compared to the original version of the AxioLocusZoom package, scripts have been updated and adapted to the needs of the LocusZoom Shiny app developed by SevenBridges.


### How To Use

1. Install devtools
```R
install.packages("devtools")
```
2. Load the devtools package
```R
library(devtools)
```
3. Install using `install_github()` command
```R
devtools::install_github("marko3f/axiolocuszoom-sbg@v0.1.4.6-alpha", auth_token = <github_personal_access_token>)
```

4. Example of how to run code:
 * in ui: 
 ```R
 ...
   mainPanel(
     LocusZoomPlotOutput("locuszoom")
   )
 ```
 * in server:
```R
  output$locuszoom<-renderLocusZoomPlot({
    LocusZoomPlot(list(assoc_url = [data source URL],
                       assoc_analysis = [name of a database file],
                       assoc_id_field = [name of id_field],
                       gene_url = [data source URL],
                       gene_source = [value of gene_source],
                       chr = [chromosome number],
                       start = [start position],
                       end = [end position]))
  })
```

<hr>

###### Source: The Center for Statistical Genetics at the University of Michigan School of Public Health, [locuszoom](https://statgen.github.io/locuszoom/)
###### Source: Karl Broman, [Putting your R package on GitHub](http://kbroman.org/pkg_primer/pages/github.html)
###### Source: James Hester, [devtools install_github() documentation](https://www.rdocumentation.org/packages/devtools/versions/1.13.6/topics/install_github)

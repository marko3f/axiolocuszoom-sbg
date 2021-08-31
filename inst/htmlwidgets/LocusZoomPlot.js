HTMLWidgets.widget({

  name: 'LocusZoomPlot',

  type: 'output',

  factory: function(el, width, height) {

    return {

      renderValue: function(x) {
        var lz_id = x.lz_id;    // options: 'platform_user_data', 'platform_example_data', 'local_user_data', 'local_example_data'
        
        var online = x.assoc_url;
        
        
        // UM Database Data
        if (x.lz_id == 'UM_database_data') {
          var apiBase_UM_database_data, data_sources_UM_database_data;
          
          apiBase_UM_database_data = "https://portaldev.sph.umich.edu/api/v1/";
          
          data_sources_UM_database_data = new LocusZoom.DataSources()
              .add("assoc", ["AssociationLZ", {url: apiBase_UM_database_data + "statistic/single/", params: { source: x.assoc_analysis, id_field: "variant" }}])
              .add("ld", ["LDServer", { url: "https://portaldev.sph.umich.edu/ld/", params: { source: '1000G', build: 'GRCh37', population: 'ALL' } }])
              .add("gene", ["GeneLZ", { url: apiBase_UM_database_data + "annotation/genes/", params: { build: 'GRCh37' } }])
              .add("recomb", ["RecombLZ", { url: apiBase_UM_database_data + "annotation/recomb/results/", params: { build: 'GRCh37' } }])
              .add("constraint", ["GeneConstraintLZ", { url: "https://gnomad.broadinstitute.org/api/", params: { build: 'GRCh37' } }]);
          
        }
        
        // Platform User Data
        if (x.lz_id == 'platform_user_data') {
          var apiBase_platform_user_data, data_sources_platform_user_data, apiBase_assoc_platform_user_data;
        
          apiBase_platform_user_data = "https://portaldev.sph.umich.edu/api/v1/";
          apiBase_assoc_platform_user_data = window.location.origin + window.location.pathname.substr(0, window.location.pathname.lastIndexOf("/") + 1) + "staticdata/" + x.sub_dir + "/";
          data_sources_platform_user_data = new LocusZoom.DataSources()
                .add("assoc", ["AssociationLZ", {url: apiBase_assoc_platform_user_data + x.param_assoc + "?", params: { source: 974, id_field: x.assoc_id_field }}]);
          if (x.ld_platform_user_data_source_flag == 'UM Database') {
              data_sources_platform_user_data.add("ld", ["LDServer", { url: "https://portaldev.sph.umich.edu/ld/", params: { source: '1000G', build: x.genome_build, population: 'ALL' } }]);
          } else {
              data_sources_platform_user_data.add("ld", ["LDServer", { url: apiBase_assoc_platform_user_data + x.param_ld + "?" }]);
          }
          // Define data source for Gene Annotations layer
          if (x.genes_platform_user_data_source_flag == 'UM Database') {
              data_sources_platform_user_data.add("gene", ["GeneLZ", { url: 'https://portaldev.sph.umich.edu/api/v1/' + "annotation/genes/", params: { build: x.genome_build } }]);
          } else {
              data_sources_platform_user_data.add("gene", ["GeneLZ", { url: apiBase_assoc_platform_user_data + x.param_genes + "?", params: { build: x.genome_build } }]);
          }
          // Define data source for Recombination Rates layer
          if (x.recomb_platform_user_data_source_flag == 'UM Database') {
              data_sources_platform_user_data.add("recomb", ["RecombLZ", { url: "https://portaldev.sph.umich.edu/api/v1/" + "annotation/recomb/results/", params: { build: x.genome_build } }]);
          } else {
              data_sources_platform_user_data.add("recomb", ["RecombLZ", { url: apiBase_assoc_platform_user_data + x.param_recomb + "?", params: { build: x.genome_build } }]);
          }
          // Define data source for Constraints layer
          if (x.constraint_platform_user_data_source_flag == 'UM Database') {
              data_sources_platform_user_data.add("constraint", ["GeneConstraintLZ", { url: "https://gnomad.broadinstitute.org/api/", params: { build: x.genome_build } }]);
          } else {
              data_sources_platform_user_data.add("constraint", ["GeneConstraintLZ", {  url: apiBase_assoc_platform_user_data + x.param_constraint + "?", params: { build: x.genome_build } }]);
          }
        }

        // Local User Data
        
        if (x.lz_id == 'local_user_data') {
          var apiBase_local_user_data, data_sources_local_user_data, apiBase_assoc_local_user_data;
        
          apiBase_local_user_data = "https://portaldev.sph.umich.edu/api/v1/";
          apiBase_assoc_local_user_data = window.location.origin + window.location.pathname.substr(0, window.location.pathname.lastIndexOf("/") + 1) + "staticdata/" + x.sub_dir + "/";
          data_sources_local_user_data = new LocusZoom.DataSources()
                .add("assoc", ["AssociationLZ", {url: apiBase_assoc_local_user_data + x.param_assoc + "?", params: { source: 974, id_field: x.assoc_id_field }}]);
          if (x.ld_local_user_data_source_flag == 'UM Database') {
              data_sources_local_user_data.add("ld", ["LDServer", { url: "https://portaldev.sph.umich.edu/ld/", params: { source: '1000G', build: x.genome_build, population: 'ALL' } }]);
          } else {
              data_sources_local_user_data.add("ld", ["LDServer", { url: apiBase_assoc_local_user_data + x.param_ld + "?" }]);
          }
          // Define data source for Gene Annotations layer
          if (x.genes_local_user_data_source_flag == 'UM Database') {
              data_sources_local_user_data.add("gene", ["GeneLZ", { url: 'https://portaldev.sph.umich.edu/api/v1/' + "annotation/genes/", params: { build: x.genome_build } }]);
          } else {
              data_sources_local_user_data.add("gene", ["GeneLZ", { url: apiBase_assoc_local_user_data + x.param_genes + "?", params: { build: x.genome_build } }]);
          }
          // Define data source for Recombination Rates layer
          if (x.recomb_local_user_data_source_flag == 'UM Database') {
              data_sources_local_user_data.add("recomb", ["RecombLZ", { url: "https://portaldev.sph.umich.edu/api/v1/" + "annotation/recomb/results/", params: { build: x.genome_build } }]);
          } else {
              data_sources_local_user_data.add("recomb", ["RecombLZ", { url: apiBase_assoc_local_user_data + x.param_recomb + "?", params: { build: x.genome_build } }]);
          }
          // Define data source for Constraints layer
          if (x.constraint_local_user_data_source_flag == 'UM Database') {
              data_sources_local_user_data.add("constraint", ["GeneConstraintLZ", { url: "https://gnomad.broadinstitute.org/api/", params: { build: x.genome_build } }]);
          } else {
              data_sources_local_user_data.add("constraint", ["GeneConstraintLZ", {  url: apiBase_assoc_local_user_data + x.param_constraint + "?", params: { build: x.genome_build } }]);
          }
        }
        
        

        // Platform / Local Example Data
        if (x.lz_id == 'example_data') {
          var apiBase_example_data, data_sources_example_data;
          apiBase_example_data = window.location.origin + window.location.pathname.substr(0, window.location.pathname.lastIndexOf("/") + 1) + "staticdata/";
          data_sources_example_data = new LocusZoom.DataSources()
                  .add("assoc", ["AssociationLZ", {url: apiBase_example_data + x.param_assoc + "?", params: { source: 45, id_field: x.assoc_id_field }}])
                  .add("ld", ["LDServer", { url: apiBase_example_data + x.param_ld + "?" }])
                  .add("gene", ["GeneLZ", { url: apiBase_example_data + x.param_genes + "?", params: { build: 'GRCh37' } }])
                  .add("recomb", ["RecombLZ", { url: apiBase_example_data + x.param_recomb + "?", params: { build: 'GRCh37' } }])
                  .add("constraint", ["GeneConstraintLZ", {  url: apiBase_example_data + x.param_constraint + "?", params: { build: 'GRCh37' } }]);
        }


        // Get the standard association plot layout from LocusZoom's built-in layouts
        var stateUrlMapping = {chr: "chrom", start: "start", end: "end"};
        // Fetch initial position from the URL, or use some defaults
        //var initialState = LzDynamicUrls.paramsFromUrl(stateUrlMapping);
        var initialState = {};
        if(online == 1) {
            initialState = {chr: x.chr_value, start: x.min_position, end: x.max_position};
        } else {
           if (x.LD_reference == "default") {
               initialState = {chr: x.chr_value, start: x.min_position, end: x.max_position};  
          } else {
               initialState = {chr: x.chr_value, start: x.min_position, end: x.max_position, ldrefvar: x.LD_reference};
          }
        }

        // Define layout
        var layout = LocusZoom.Layouts.get("plot", "standard_association", {state: initialState, namespace: { assoc: 'assoc' }, min_region_scale: 1000, max_region_scale: 1000000});

        // Define plot depending on the data type
        var plot;
        
        switch(lz_id) {
          case 'platform_user_data':
            // code block
            plot = LocusZoom.populate(el, data_sources_platform_user_data, layout);
            break;
          case 'local_user_data':
            plot = LocusZoom.populate(el, data_sources_local_user_data, layout);
            break;
          case 'example_data':
            plot = LocusZoom.populate(el, data_sources_example_data, layout);
            break;
          case 'UM_database_data':
            plot = LocusZoom.populate(el, data_sources_UM_database_data, layout);
            break;
        }
     

        plot.layout.panels.forEach(function(panel){
            plot.panels[panel.id].addBasicLoader();
        });

        window.plot;

      }

    };
  }
});

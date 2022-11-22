import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-block-board',
    templateUrl: './block-board.component.html',
    styleUrls: ['./block-board.component.css']
})
export class BlockBoardComponent implements OnInit {

    margin: any;
    width: number;
    height: number;
    svg: any;
    g: any;
    yScales: any;
    actualTransit = [];
    gainTransit = [];
    lostTransit = [];

    constructor() {
    }

    ngOnInit() {

        const chartDiv = document.getElementById('line-chart');
        this.width = chartDiv.clientWidth;
        this.height = chartDiv.clientHeight;
        this.margin = {top: 10, right: 75, bottom: 30, left: 50};
        this.width = this.width - this.margin.left - this.margin.right;
        this.height = this.height - this.margin.top - this.margin.bottom;
        /**
         * Where to plot the diagram
         */
        this.svg = d3.select('#line-chart').append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform',
                'translate(' + this.margin.left + ',' + this.margin.top + ')');


        /* const data = [{name:'Anchiyang',value:1},{name:'Wuhan',value:2} ,
         {name:'Shangu',value:3}, {name:'Shangai',value:4}, 
         {name:'Ninbagu',value:5}, {name:'Ceipap',value:10},
         {name:'Ninbu',value:9},{name:'Jakarta',value:8},
         {name:'Miami',value:7}, {name:'Miangvila',value:6},
         {name:'Viyatnam',value:11}, {name:'Shilong',value:12}];*/

        const data = {
            "allocation_points": 1000,
            "customer": "costco",
            "route": "china-us",
            "timespan": "10",
            "period": "2017-Q1",
            "route_coverage_factor": "10",
            "seasonal_factor": "10",
            "forward_leg": "10",
            "reverse_leg": "10",
            "liner_owned_port_usage_factor": "10",
            "intermodal_factor_route": {"road": "20", "rail": "10", "sea": "30"},
            "business_factor_name": "Regular",
            "business_factor_value": "20",
            "nodes": [{
                "from": "Anichang",
                "to": "Wuhan",
                "node_coverage_factor": "5",
                "seasonal_factor": "5",
                "forward_leg": "5",
                "reverse_leg": "",
                "liner_owned_port_usage_factor": "",
                "intermodal_factor": {"road": "4", "rail": "5", "sea": "5"},
                "fws": [{"name": "FW1M", "in_network": "true", "modes": []}, {
                    "name": "FW2M",
                    "in_network": "true",
                    "modes": ["Rail", "Road"]
                }, {"name": "FW3M", "in_network": "true", "modes": []}, {
                    "name": "CTOM",
                    "in_network": "true",
                    "modes": []
                }, {"name": "CTO", "in_network": "true", "modes": []}],
                "value": 1
            }, {
                "from": "Wuhan",
                "to": "Shangqu",
                "node_coverage_factor": "5",
                "seasonal_factor": "7",
                "forward_leg": "7",
                "reverse_leg": "",
                "liner_owned_port_usage_factor": "",
                "intermodal_factor": {"road": "4", "rail": "7", "sea": "10"},
                "fws": [{"name": "FW1M", "in_network": "true", "modes": []}, {
                    "name": "FW2M",
                    "in_network": "true",
                    "modes": ["Rail", "Road"]
                }, {"name": "FW3M", "in_network": "true", "modes": ["Rail", "Road"]}, {
                    "name": "CTOM",
                    "in_network": "true",
                    "modes": []
                }, {"name": "CTO", "in_network": "true", "modes": []}],
                "value": 2
            }, {
                "from": "Shangqu",
                "to": "Xingang",
                "node_coverage_factor": "5",
                "seasonal_factor": "10",
                "forward_leg": "10",
                "reverse_leg": "",
                "liner_owned_port_usage_factor": "",
                "intermodal_factor": {"road": "4", "rail": "10", "sea": "10"},
                "fws": [{"name": "FW1M", "in_network": "true", "modes": []}, {
                    "name": "FW2M",
                    "in_network": "true",
                    "modes": ["Rail", "Road"]
                }, {"name": "FW3M", "in_network": "true", "modes": ["Rail", "Road"]}, {
                    "name": "CTOM",
                    "in_network": "true",
                    "modes": []
                }, {"name": "CTO", "in_network": "true", "modes": []}],
                "value": 3
            }, {
                "from": "Xingang",
                "to": "Qingdao",
                "node_coverage_factor": "5",
                "seasonal_factor": "5",
                "forward_leg": "5",
                "reverse_leg": "",
                "liner_owned_port_usage_factor": "",
                "intermodal_factor": {"road": "2", "rail": "5", "sea": "10"},
                "fws": [{"name": "FW1M", "in_network": "true", "modes": ["Sea"]}, {
                    "name": "FW2M",
                    "in_network": "true",
                    "modes": ["Rail"]
                }, {"name": "FW3M", "in_network": "true", "modes": []}, {
                    "name": "CTOM",
                    "in_network": "true",
                    "modes": ["Port"]
                }, {"name": "CTO", "in_network": "true", "modes": []}],
                "value": 4
            }, {
                "from": "Qingdao",
                "to": "Ningbo",
                "node_coverage_factor": "5",
                "seasonal_factor": "15",
                "forward_leg": "15",
                "reverse_leg": "",
                "liner_owned_port_usage_factor": "40",
                "intermodal_factor": {"road": "10", "rail": "15", "sea": "15"},
                "fws": [{"name": "FW1M", "in_network": "true", "modes": []}, {
                    "name": "FW2M",
                    "in_network": "true",
                    "modes": ["Rail"]
                }, {"name": "FW3M", "in_network": "true", "modes": ["Rail"]}, {
                    "name": "CTOM",
                    "in_network": "true",
                    "modes": []
                }, {"name": "CTO", "in_network": "true", "modes": ["Port"]}],
                "value": 5
            }, {
                "from": "Ningbo",
                "to": "Shanghai",
                "node_coverage_factor": "3",
                "seasonal_factor": "1",
                "forward_leg": "1",
                "reverse_leg": "",
                "liner_owned_port_usage_factor": "",
                "intermodal_factor": {"road": "3", "rail": "1", "sea": "1"},
                "fws": [{"name": "FW1M", "in_network": "true", "modes": ["Sea"]}, {
                    "name": "FW2M",
                    "in_network": "true",
                    "modes": ["Rail"]
                }, {"name": "FW3M", "in_network": "true", "modes": ["Rail"]}, {
                    "name": "CTOM",
                    "in_network": "true",
                    "modes": ["Port"]
                }, {"name": "CTO", "in_network": "true", "modes": []}],
                "value": 10
            }, {
                "from": "Shanghai",
                "to": "Cai Mep",
                "node_coverage_factor": "5",
                "seasonal_factor": "5",
                "forward_leg": "5",
                "reverse_leg": "",
                "liner_owned_port_usage_factor": "20",
                "intermodal_factor": {"road": "7", "rail": "5", "sea": "5"},
                "fws": [{"name": "FW1M", "in_network": "true", "modes": ["Sea"]}, {
                    "name": "FW2M",
                    "in_network": "true",
                    "modes": []
                }, {"name": "FW3M", "in_network": "true", "modes": []}, {
                    "name": "CTOM",
                    "in_network": "true",
                    "modes": ["Port"]
                }, {"name": "CTO", "in_network": "true", "modes": []}],
                "value": 9
            }, {
                "from": "Cai Mep",
                "to": "Jakarta",
                "node_coverage_factor": "4",
                "seasonal_factor": "5",
                "forward_leg": "5",
                "reverse_leg": "",
                "liner_owned_port_usage_factor": " ",
                "intermodal_factor": {"road": "10", "rail": "5", "sea": "5"},
                "fws": [{"name": "FW1M", "in_network": "true", "modes": []}, {
                    "name": "FW2M",
                    "in_network": "true",
                    "modes": []
                }, {"name": "FW3M", "in_network": "true", "modes": []}, {
                    "name": "CTOM",
                    "in_network": "true",
                    "modes": []
                }, {"name": "CTO", "in_network": "true", "modes": ["Port"]}],
                "value": 8
            }, {
                "from": "Jakarta",
                "to": "Miami",
                "node_coverage_factor": "2",
                "seasonal_factor": "0",
                "forward_leg": "0",
                "reverse_leg": "",
                "liner_owned_port_usage_factor": "",
                "intermodal_factor": {"road": "2", "rail": "2", "sea": "2"},
                "fws": [{"name": "FW1M", "in_network": "true", "modes": ["Sea"]}, {
                    "name": "FW2M",
                    "in_network": "true",
                    "modes": []
                }, {"name": "FW3M", "in_network": "true", "modes": []}, {
                    "name": "CTOM",
                    "in_network": "true",
                    "modes": ["Port"]
                }, {"name": "CTO", "in_network": "true", "modes": []}],
                "value": 7
            }, {
                "from": "Miami",
                "to": "Jacksonville",
                "node_coverage_factor": "2",
                "seasonal_factor": "10",
                "forward_leg": "10",
                "reverse_leg": "",
                "liner_owned_port_usage_factor": "40",
                "intermodal_factor": {"road": "15", "rail": "10", "sea": "10"},
                "fws": [{"name": "FW1M", "in_network": "true", "modes": ["Sea"]}, {
                    "name": "FW2M",
                    "in_network": "true",
                    "modes": []
                }, {"name": "FW3M", "in_network": "true", "modes": []}, {
                    "name": "CTOM",
                    "in_network": "true",
                    "modes": []
                }, {"name": "CTO", "in_network": "true", "modes": ["Port"]}],
                "value": 6
            }, {
                "from": "Jacksonville",
                "to": "Atlanta",
                "node_coverage_factor": "5",
                "seasonal_factor": "3",
                "forward_leg": "3",
                "reverse_leg": "",
                "liner_owned_port_usage_factor": "",
                "intermodal_factor": {"road": "5", "rail": "3", "sea": "3"},
                "fws": [{"name": "FW1M", "in_network": "true", "modes": []}, {
                    "name": "FW2M",
                    "in_network": "true",
                    "modes": ["Rail"]
                }, {"name": "FW3M", "in_network": "true", "modes": ["Rail"]}, {
                    "name": "CTOM",
                    "in_network": "true",
                    "modes": []
                }, {"name": "CTO", "in_network": "true", "modes": []}],
                "value": 11
            }, {
                "from": "Atlanta",
                "to": "Nashville",
                "node_coverage_factor": "3",
                "seasonal_factor": "2",
                "forward_leg": "2",
                "reverse_leg": "",
                "liner_owned_port_usage_factor": "",
                "intermodal_factor": {"road": "5", "rail": "2", "sea": "2"},
                "fws": [{"name": "FW1M", "in_network": "true", "modes": []}, {
                    "name": "FW2M",
                    "in_network": "true",
                    "modes": ["Road"]
                }, {"name": "FW3M", "in_network": "true", "modes": ["Road"]}, {
                    "name": "CTOM",
                    "in_network": "true",
                    "modes": []
                }, {"name": "CTO", "in_network": "true", "modes": []}],
                "value": 12
            }, {
                "from": "Nashville",
                "to": "Bentonville",
                "node_coverage_factor": "2",
                "seasonal_factor": "2",
                "forward_leg": "2",
                "reverse_leg": "",
                "liner_owned_port_usage_factor": "",
                "intermodal_factor": {"road": "10", "rail": "2", "sea": "2"},
                "fws": [{"name": "FW1M", "in_network": "true", "modes": []}, {
                    "name": "FW2M",
                    "in_network": "true",
                    "modes": ["Road"]
                }, {"name": "FW3M", "in_network": "true", "modes": ["Road"]}, {
                    "name": "CTOM",
                    "in_network": "true",
                    "modes": []
                }, {"name": "CTO", "in_network": "true", "modes": []}],
                "value": 13
            }]
        }

        const transit = {
            "customer": "costco",
            "shipper": "Fresh Fields",
            "route": "china-us",
            "period": "2017-Q1",
            "from": "Anichang",
            "to": "Wuhan",
            "FFE": 150,
            "loadPercentage": 50,
            "FF": "FW2M",
            "mode": "Road",
            "transaction_id": "102"
        };
        const transit1 = {
            "customer": "costco",
            "shipper": "Fresh Fields",
            "route": "china-us",
            "period": "2017-Q1",
            "from": "Wuhan",
            "to": "Shangqu",
            "FFE": 200,
            "loadPercentage": 50,
            "FF": "FW2M",
            "mode": "Rail",
            "transaction_id": "103"
        };
        const transit3 = {
            "customer": "costco",
            "shipper": "Fresh Fields",
            "route": "china-us",
            "period": "2017-Q1",
            "from": "Shangqu",
            "to": "Xingang",
            "FFE": 250,
            "loadPercentage": 50,
            "FF": "FW3M",
            "mode": "Road",
            "transaction_id": "104"
        };


        data.nodes.forEach(function (d) {
            d.value = +d.value;
        });


        /**
         * Append Line
         *  */
        const line = d3.line()
            .curve(d3.curveStepBefore)
            .x(function (d) {
                return d['value'] % 5 === 0 ? 750 : d['value'] % 5 * 150;
            })
            .y(function (d) {
                return d['value'] === 4 ? 50 : Math.ceil(d['value'] / 5) * 100;
            });

        this.svg.append('path')
            .datum(data.nodes)
            .attr('fill', 'none')
            .attr('stroke', 'red')
            .style("stroke-dasharray", ("3, 3"))
            .attr('d', line);

        /**
         * Appending Graphics
         */
        /*this.svg.selectAll("circle")
          .data(data.nodes)
          .enter().append("circle")
          .attr("r", 4)
          .attr("cx", function (d) {
            return d.value % 5 === 0 ? 750 : d.value % 5 * 150;
          })
          .attr("cy", function (d) { return d.value===4 ? 50 : Math.ceil(d.value / 5) * 100; });*/

        this.svg.selectAll("circle")
            .data(data.nodes)
            .enter().append("circle")
            .attr("r", 6)
            .attr("cx", function (d) {
                return d.value % 5 === 0 ? 750 : d.value % 5 * 150;
            })
            .attr("cy", function (d) {
                return d.value === 4 ? 50 : Math.ceil(d.value / 5) * 100;
            })
            .style("fill", 'blue');

        /**
         * Append text
         */
        this.svg.selectAll("text")
            .data(data.nodes)
            .enter().append("text")
            .attr("x", function (d) {
                /*  console.log(d, d % 5 === 0 ? 750 : d % 5 * 150, Math.ceil(d / 5) * 100);*/
                return d.value % 5 === 0 ? 750 : d.value % 5 * 150
            })
            .attr("y", function (d) {
                return (d.value === 4 ? 50 : Math.ceil(d.value / 5) * 100) + 30;
            })
            .text(function (d) {
                return d.from;
            });

        /**
         * Compare the master and create actual Object
         * Appending Feight forwarder
         */

        data.nodes.forEach(node => {
            if (node.from == transit.from && node.to == transit.to) {
                transit["value"] = node.value;
                transit["lostFF"] = [];
                node.fws.forEach(fw => {
                    if (fw.modes.indexOf(transit.mode) > -1) {
                        transit["lostFF"].push(fw.name);

                    }
                })
                var index = transit["lostFF"].indexOf(transit.FF);
                if (index > -1) {
                    transit["lostFF"].splice(index, 1);
                }
                if (transit["lostFF"].length > 0) {
                    transit["lostFF"].forEach(element => {
                        const lostTransit = {};
                        lostTransit["FF"] = element;
                        lostTransit["value"] = transit["value"];
                        lostTransit["FFE"] = transit.FFE;
                        this.lostTransit.push(lostTransit)
                    });
                }
                this.gainTransit.push(transit);
            }
        })

        data.nodes.forEach(node => {
            if (node.from == transit1.from && node.to == transit1.to) {

                transit1["value"] = node.value;
                transit1["lostFF"] = [];
                node.fws.forEach(fw => {
                    if (fw.modes.indexOf(transit1.mode) > -1) {
                        transit1["lostFF"].push(fw.name);

                    }
                })
                var index = transit1["lostFF"].indexOf(transit1.FF);
                if (index > -1) {
                    transit1["lostFF"].splice(index, 1);
                }
                if (transit1["lostFF"].length > 0) {
                    transit1["lostFF"].forEach(element => {
                        const lostTransit = {};
                        lostTransit["FF"] = element;
                        lostTransit["value"] = transit1["value"];
                        lostTransit["FFE"] = transit1.FFE;
                        this.lostTransit.push(lostTransit)
                    });
                }
                this.gainTransit.push(transit1);

            }
        })

        data.nodes.forEach(node => {
            if (node.from == transit3.from && node.to == transit3.to) {
                transit3["value"] = node.value;
                transit3["lostFF"] = [];
                node.fws.forEach(fw => {
                    if (fw.modes.indexOf(transit3.mode) > -1) {
                        transit3["lostFF"].push(fw.name);

                    }
                })
                var index = transit3["lostFF"].indexOf(transit3.FF);
                if (index > -1) {
                    transit3["lostFF"].splice(index, 1);
                }
                if (transit3["lostFF"].length > 0) {
                    transit3["lostFF"].forEach(element => {
                        const lostTransit = {};
                        lostTransit["FF"] = element;
                        lostTransit["value"] = transit3["value"];
                        lostTransit["FFE"] = transit3.FFE;
                        this.lostTransit.push(lostTransit)
                    });
                }
                this.gainTransit.push(transit3);
            }
        })


        d3.select('#line-chart').selectAll('div1')
            .data(this.gainTransit).enter()
            .append('div')
            .style('position', 'absolute')
            .style('top', function (d) {
                return ((d.value === 4 ? 50 : Math.ceil(d.value / 5) * 100) + 85) + 'px';
            })
            .style('left', function (d) {
                return (d.value % 5 === 0 ? 875 : d.value % 5 * 150 + 45) + 'px';
            })
            .style('width', '60px')
            .style('height', '20px')
            .style('text-align', 'center')
            .style('text-color', 'white')
            .style('background-color', 'limegreen').text(function (d) {
            return d.FF + d.FFE;
        });

        d3.select('#line-chart').selectAll('div2')
            .data(this.lostTransit).enter()
            .append('div')
            .style('position', 'absolute')
            .style('top', function (d) {
                return ((d.value === 4 ? 50 : Math.ceil(d.value / 5) * 100) + 105) + 'px';
            })
            .style('left', function (d) {
                return (d.value % 5 === 0 ? 775 : d.value % 5 * 150 + 45) + 'px';
            })
            .style('width', '60px')
            .style('height', '20px')
            .style('text-align', 'center')
            .style('background-color', 'orangered').text(function (d) {
            return d.FF + d.FFE;
            ;
        });

        /**
         * Appending images
         */
        d3.select('#line-chart').selectAll('.icon')
            .data(this.gainTransit).enter()
            .append('foreignObject')
            .append('xhtml:i')
            .attr('class', function (d) {
                if (d.mode == 'Road') {
                    return 'fa fa-truck';
                } 
                    return 'fa fa-train';
                
            })
            .style('position', 'absolute')
            .style('top', function (d) {
                return ((d.value === 4 ? 0 : Math.ceil(d.value / 5) * 100) + 35) + 'px';
            })
            .style('left', function (d) {
                return (d.value % 5 === 0 ? 775 : d.value % 5 * 150 + 95) + 'px';
            })
            .style('width', '60px')
            .style('height', '20px')
            .style('text-align', 'center')
            .text(function (d) {
                return '';
            });

        /**
         * Appending line for tranaction data
         */

        const line1 = d3.line()
            .curve(d3.curveStepBefore)
            .x(function (d) {
                return d['value'] % 5 === 0 ? 750 : d['value'] % 5 * 150;
            })
            .y(function (d) {
                return d['value'] === 4 ? 50 : Math.ceil(d['value'] / 5) * 100;
            });

        this.svg.append('path')
            .datum(this.gainTransit)
            .attr('fill', 'none')
            .attr('stroke', 'orangered')
            .attr('d', line1);

    }

    getIcon(d) {
        if (d.mode == 'Road') {
            return 'fa fa-truck';
        } 
            return 'fal fa-train';
        
    }

    /* drawDots(data, x, y, color) {

       const self = this;

       const arcTriangle = d3.symbol().type(d3.symbolTriangle);

       const dots = this.svg.selectAll('.' + color)

         .data(data)

         .enter().append('path')

         .attr('class', (d, i) => d.code + ' point')

         .attr('d', arcTriangle)

         .attr('fill', color)

         .attr('transform', (d, i) => 'translate(' + x(d.date) + ',' + self.yScales.get(d.code)(d.close) + ')');
     }*/


}

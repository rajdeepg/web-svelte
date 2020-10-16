import { S as SvelteComponentDev, i as init, d as dispatch_dev, y as globals, s as safe_not_equal, z as assign, v as validate_slots, a as space, e as element, t as text, p as create_component, A as query_selector_all, g as detach_dev, h as claim_space, c as claim_element, b as children, f as claim_text, q as claim_component, k as add_location, j as attr_dev, l as insert_dev, m as append_dev, r as mount_component, n as set_data_dev, B as get_spread_update, C as get_spread_object, u as transition_in, w as transition_out, x as destroy_component } from './client.1ef0b4ea.js';
import { r as requests, C as CovidStat, a as CovidChart, T as TableContainer } from './TableContainer.11bd4089.js';

var stateNames = [
  {
    name: 'Alabama',
    abbreviation: 'AL',
  },
  {
    name: 'Alaska',
    abbreviation: 'AK',
  },
  {
    name: 'American Samoa',
    abbreviation: 'AS',
  },
  {
    name: 'Arizona',
    abbreviation: 'AZ',
  },
  {
    name: 'Arkansas',
    abbreviation: 'AR',
  },
  {
    name: 'California',
    abbreviation: 'CA',
  },
  {
    name: 'Colorado',
    abbreviation: 'CO',
  },
  {
    name: 'Connecticut',
    abbreviation: 'CT',
  },
  {
    name: 'Delaware',
    abbreviation: 'DE',
  },
  {
    name: 'District Of Columbia',
    abbreviation: 'DC',
  },
  {
    name: 'Federated States Of Micronesia',
    abbreviation: 'FM',
  },
  {
    name: 'Florida',
    abbreviation: 'FL',
  },
  {
    name: 'Georgia',
    abbreviation: 'GA',
  },
  {
    name: 'Guam',
    abbreviation: 'GU',
  },
  {
    name: 'Hawaii',
    abbreviation: 'HI',
  },
  {
    name: 'Idaho',
    abbreviation: 'ID',
  },
  {
    name: 'Illinois',
    abbreviation: 'IL',
  },
  {
    name: 'Indiana',
    abbreviation: 'IN',
  },
  {
    name: 'Iowa',
    abbreviation: 'IA',
  },
  {
    name: 'Kansas',
    abbreviation: 'KS',
  },
  {
    name: 'Kentucky',
    abbreviation: 'KY',
  },
  {
    name: 'Louisiana',
    abbreviation: 'LA',
  },
  {
    name: 'Maine',
    abbreviation: 'ME',
  },
  {
    name: 'Marshall Islands',
    abbreviation: 'MH',
  },
  {
    name: 'Maryland',
    abbreviation: 'MD',
  },
  {
    name: 'Massachusetts',
    abbreviation: 'MA',
  },
  {
    name: 'Michigan',
    abbreviation: 'MI',
  },
  {
    name: 'Minnesota',
    abbreviation: 'MN',
  },
  {
    name: 'Mississippi',
    abbreviation: 'MS',
  },
  {
    name: 'Missouri',
    abbreviation: 'MO',
  },
  {
    name: 'Montana',
    abbreviation: 'MT',
  },
  {
    name: 'Nebraska',
    abbreviation: 'NE',
  },
  {
    name: 'Nevada',
    abbreviation: 'NV',
  },
  {
    name: 'New Hampshire',
    abbreviation: 'NH',
  },
  {
    name: 'New Jersey',
    abbreviation: 'NJ',
  },
  {
    name: 'New Mexico',
    abbreviation: 'NM',
  },
  {
    name: 'New York',
    abbreviation: 'NY',
  },
  {
    name: 'North Carolina',
    abbreviation: 'NC',
  },
  {
    name: 'North Dakota',
    abbreviation: 'ND',
  },
  {
    name: 'Northern Mariana Islands',
    abbreviation: 'MP',
  },
  {
    name: 'Ohio',
    abbreviation: 'OH',
  },
  {
    name: 'Oklahoma',
    abbreviation: 'OK',
  },
  {
    name: 'Oregon',
    abbreviation: 'OR',
  },
  {
    name: 'Palau',
    abbreviation: 'PW',
  },
  {
    name: 'Pennsylvania',
    abbreviation: 'PA',
  },
  {
    name: 'Puerto Rico',
    abbreviation: 'PR',
  },
  {
    name: 'Rhode Island',
    abbreviation: 'RI',
  },
  {
    name: 'South Carolina',
    abbreviation: 'SC',
  },
  {
    name: 'South Dakota',
    abbreviation: 'SD',
  },
  {
    name: 'Tennessee',
    abbreviation: 'TN',
  },
  {
    name: 'Texas',
    abbreviation: 'TX',
  },
  {
    name: 'Utah',
    abbreviation: 'UT',
  },
  {
    name: 'Vermont',
    abbreviation: 'VT',
  },
  {
    name: 'Virgin Islands',
    abbreviation: 'VI',
  },
  {
    name: 'Virginia',
    abbreviation: 'VA',
  },
  {
    name: 'Washington',
    abbreviation: 'WA',
  },
  {
    name: 'West Virginia',
    abbreviation: 'WV',
  },
  {
    name: 'Wisconsin',
    abbreviation: 'WI',
  },
  {
    name: 'Wyoming',
    abbreviation: 'WY',
  },
];

/* src/routes/[state].svelte generated by Svelte v3.20.1 */

const { console: console_1 } = globals;
const file = "src/routes/[state].svelte";

function create_fragment(ctx) {
	let title_value;
	let t0;
	let div1;
	let div0;
	let h1;
	let t1;
	let t2;
	let t3;
	let t4;
	let current;
	document.title = title_value = "Covid 19 - " + /*state*/ ctx[0];
	const covidstat_spread_levels = [/*stats*/ ctx[1]];
	let covidstat_props = {};

	for (let i = 0; i < covidstat_spread_levels.length; i += 1) {
		covidstat_props = assign(covidstat_props, covidstat_spread_levels[i]);
	}

	const covidstat = new CovidStat({ props: covidstat_props, $$inline: true });
	const covidchart = new CovidChart({ $$inline: true });

	const block = {
		c: function create() {
			t0 = space();
			div1 = element("div");
			div0 = element("div");
			h1 = element("h1");
			t1 = text("Covid 19 - ");
			t2 = text(/*state*/ ctx[0]);
			t3 = space();
			create_component(covidstat.$$.fragment);
			t4 = space();
			create_component(covidchart.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-ululck\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			h1 = claim_element(div0_nodes, "H1", {});
			var h1_nodes = children(h1);
			t1 = claim_text(h1_nodes, "Covid 19 - ");
			t2 = claim_text(h1_nodes, /*state*/ ctx[0]);
			h1_nodes.forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			t3 = claim_space(nodes);
			claim_component(covidstat.$$.fragment, nodes);
			t4 = claim_space(nodes);
			claim_component(covidchart.$$.fragment, nodes);
			this.h();
		},
		h: function hydrate() {
			add_location(h1, file, 43, 4, 1041);
			attr_dev(div0, "class", "container");
			add_location(div0, file, 42, 2, 1013);
			attr_dev(div1, "class", "section header");
			add_location(div1, file, 41, 0, 982);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, div1, anchor);
			append_dev(div1, div0);
			append_dev(div0, h1);
			append_dev(h1, t1);
			append_dev(h1, t2);
			insert_dev(target, t3, anchor);
			mount_component(covidstat, target, anchor);
			insert_dev(target, t4, anchor);
			mount_component(covidchart, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if ((!current || dirty & /*state*/ 1) && title_value !== (title_value = "Covid 19 - " + /*state*/ ctx[0])) {
				document.title = title_value;
			}

			if (!current || dirty & /*state*/ 1) set_data_dev(t2, /*state*/ ctx[0]);

			const covidstat_changes = (dirty & /*stats*/ 2)
			? get_spread_update(covidstat_spread_levels, [get_spread_object(/*stats*/ ctx[1])])
			: {};

			covidstat.$set(covidstat_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(covidstat.$$.fragment, local);
			transition_in(covidchart.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(covidstat.$$.fragment, local);
			transition_out(covidchart.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div1);
			if (detaching) detach_dev(t3);
			destroy_component(covidstat, detaching);
			if (detaching) detach_dev(t4);
			destroy_component(covidchart, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

async function preload(page) {
	const state = page.params["state"];

	if (stateNames.find(s => s.abbreviation === state) === undefined) {
		console.log("should get error");
		this.error(404, "State Not Found");
		return;
	}

	try {
		const stats = await requests.stateStats(state);
		return { state, stats };
	} catch(e) {
		console.log(e);
		this.error(500, "There was an error in calling the api, please try again in 5 minutes.");
		return;
	}
}

function instance($$self, $$props, $$invalidate) {
	let { state } = $$props;
	let { stats } = $$props;
	const writable_props = ["state", "stats"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<U5Bstateu5D> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("U5Bstateu5D", $$slots, []);

	$$self.$set = $$props => {
		if ("state" in $$props) $$invalidate(0, state = $$props.state);
		if ("stats" in $$props) $$invalidate(1, stats = $$props.stats);
	};

	$$self.$capture_state = () => ({
		stateNames,
		requests,
		preload,
		CovidStat,
		CovidChart,
		TableContainer,
		state,
		stats
	});

	$$self.$inject_state = $$props => {
		if ("state" in $$props) $$invalidate(0, state = $$props.state);
		if ("stats" in $$props) $$invalidate(1, stats = $$props.stats);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [state, stats];
}

class U5Bstateu5D extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { state: 0, stats: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "U5Bstateu5D",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*state*/ ctx[0] === undefined && !("state" in props)) {
			console_1.warn("<U5Bstateu5D> was created without expected prop 'state'");
		}

		if (/*stats*/ ctx[1] === undefined && !("stats" in props)) {
			console_1.warn("<U5Bstateu5D> was created without expected prop 'stats'");
		}
	}

	get state() {
		throw new Error("<U5Bstateu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set state(value) {
		throw new Error("<U5Bstateu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get stats() {
		throw new Error("<U5Bstateu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set stats(value) {
		throw new Error("<U5Bstateu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default U5Bstateu5D;
export { preload };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiW3N0YXRlXS5jMzYxODYxZC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RhdGEvc3RhdGVOYW1lcy5qcyIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvW3N0YXRlXS5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgW1xuICB7XG4gICAgbmFtZTogJ0FsYWJhbWEnLFxuICAgIGFiYnJldmlhdGlvbjogJ0FMJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdBbGFza2EnLFxuICAgIGFiYnJldmlhdGlvbjogJ0FLJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdBbWVyaWNhbiBTYW1vYScsXG4gICAgYWJicmV2aWF0aW9uOiAnQVMnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ0FyaXpvbmEnLFxuICAgIGFiYnJldmlhdGlvbjogJ0FaJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdBcmthbnNhcycsXG4gICAgYWJicmV2aWF0aW9uOiAnQVInLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ0NhbGlmb3JuaWEnLFxuICAgIGFiYnJldmlhdGlvbjogJ0NBJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdDb2xvcmFkbycsXG4gICAgYWJicmV2aWF0aW9uOiAnQ08nLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ0Nvbm5lY3RpY3V0JyxcbiAgICBhYmJyZXZpYXRpb246ICdDVCcsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnRGVsYXdhcmUnLFxuICAgIGFiYnJldmlhdGlvbjogJ0RFJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdEaXN0cmljdCBPZiBDb2x1bWJpYScsXG4gICAgYWJicmV2aWF0aW9uOiAnREMnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ0ZlZGVyYXRlZCBTdGF0ZXMgT2YgTWljcm9uZXNpYScsXG4gICAgYWJicmV2aWF0aW9uOiAnRk0nLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ0Zsb3JpZGEnLFxuICAgIGFiYnJldmlhdGlvbjogJ0ZMJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdHZW9yZ2lhJyxcbiAgICBhYmJyZXZpYXRpb246ICdHQScsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnR3VhbScsXG4gICAgYWJicmV2aWF0aW9uOiAnR1UnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ0hhd2FpaScsXG4gICAgYWJicmV2aWF0aW9uOiAnSEknLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ0lkYWhvJyxcbiAgICBhYmJyZXZpYXRpb246ICdJRCcsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnSWxsaW5vaXMnLFxuICAgIGFiYnJldmlhdGlvbjogJ0lMJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdJbmRpYW5hJyxcbiAgICBhYmJyZXZpYXRpb246ICdJTicsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnSW93YScsXG4gICAgYWJicmV2aWF0aW9uOiAnSUEnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ0thbnNhcycsXG4gICAgYWJicmV2aWF0aW9uOiAnS1MnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ0tlbnR1Y2t5JyxcbiAgICBhYmJyZXZpYXRpb246ICdLWScsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnTG91aXNpYW5hJyxcbiAgICBhYmJyZXZpYXRpb246ICdMQScsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnTWFpbmUnLFxuICAgIGFiYnJldmlhdGlvbjogJ01FJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdNYXJzaGFsbCBJc2xhbmRzJyxcbiAgICBhYmJyZXZpYXRpb246ICdNSCcsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnTWFyeWxhbmQnLFxuICAgIGFiYnJldmlhdGlvbjogJ01EJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdNYXNzYWNodXNldHRzJyxcbiAgICBhYmJyZXZpYXRpb246ICdNQScsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnTWljaGlnYW4nLFxuICAgIGFiYnJldmlhdGlvbjogJ01JJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdNaW5uZXNvdGEnLFxuICAgIGFiYnJldmlhdGlvbjogJ01OJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdNaXNzaXNzaXBwaScsXG4gICAgYWJicmV2aWF0aW9uOiAnTVMnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ01pc3NvdXJpJyxcbiAgICBhYmJyZXZpYXRpb246ICdNTycsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnTW9udGFuYScsXG4gICAgYWJicmV2aWF0aW9uOiAnTVQnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ05lYnJhc2thJyxcbiAgICBhYmJyZXZpYXRpb246ICdORScsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnTmV2YWRhJyxcbiAgICBhYmJyZXZpYXRpb246ICdOVicsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnTmV3IEhhbXBzaGlyZScsXG4gICAgYWJicmV2aWF0aW9uOiAnTkgnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ05ldyBKZXJzZXknLFxuICAgIGFiYnJldmlhdGlvbjogJ05KJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdOZXcgTWV4aWNvJyxcbiAgICBhYmJyZXZpYXRpb246ICdOTScsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnTmV3IFlvcmsnLFxuICAgIGFiYnJldmlhdGlvbjogJ05ZJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdOb3J0aCBDYXJvbGluYScsXG4gICAgYWJicmV2aWF0aW9uOiAnTkMnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ05vcnRoIERha290YScsXG4gICAgYWJicmV2aWF0aW9uOiAnTkQnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ05vcnRoZXJuIE1hcmlhbmEgSXNsYW5kcycsXG4gICAgYWJicmV2aWF0aW9uOiAnTVAnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ09oaW8nLFxuICAgIGFiYnJldmlhdGlvbjogJ09IJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdPa2xhaG9tYScsXG4gICAgYWJicmV2aWF0aW9uOiAnT0snLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ09yZWdvbicsXG4gICAgYWJicmV2aWF0aW9uOiAnT1InLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1BhbGF1JyxcbiAgICBhYmJyZXZpYXRpb246ICdQVycsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnUGVubnN5bHZhbmlhJyxcbiAgICBhYmJyZXZpYXRpb246ICdQQScsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnUHVlcnRvIFJpY28nLFxuICAgIGFiYnJldmlhdGlvbjogJ1BSJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdSaG9kZSBJc2xhbmQnLFxuICAgIGFiYnJldmlhdGlvbjogJ1JJJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdTb3V0aCBDYXJvbGluYScsXG4gICAgYWJicmV2aWF0aW9uOiAnU0MnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1NvdXRoIERha290YScsXG4gICAgYWJicmV2aWF0aW9uOiAnU0QnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1Rlbm5lc3NlZScsXG4gICAgYWJicmV2aWF0aW9uOiAnVE4nLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1RleGFzJyxcbiAgICBhYmJyZXZpYXRpb246ICdUWCcsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnVXRhaCcsXG4gICAgYWJicmV2aWF0aW9uOiAnVVQnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1Zlcm1vbnQnLFxuICAgIGFiYnJldmlhdGlvbjogJ1ZUJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdWaXJnaW4gSXNsYW5kcycsXG4gICAgYWJicmV2aWF0aW9uOiAnVkknLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1ZpcmdpbmlhJyxcbiAgICBhYmJyZXZpYXRpb246ICdWQScsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnV2FzaGluZ3RvbicsXG4gICAgYWJicmV2aWF0aW9uOiAnV0EnLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1dlc3QgVmlyZ2luaWEnLFxuICAgIGFiYnJldmlhdGlvbjogJ1dWJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdXaXNjb25zaW4nLFxuICAgIGFiYnJldmlhdGlvbjogJ1dJJyxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdXeW9taW5nJyxcbiAgICBhYmJyZXZpYXRpb246ICdXWScsXG4gIH0sXG5dO1xuIiwiPHNjcmlwdCBjb250ZXh0PVwibW9kdWxlXCI+XG4gIGltcG9ydCBzdGF0ZU5hbWVzIGZyb20gXCIuLi9kYXRhL3N0YXRlTmFtZXMuanNcIjtcbiAgaW1wb3J0IHJlcXVlc3RzIGZyb20gXCIuLi9kYXRhL3JlcXVlc3RzLmpzXCI7XG5cbiAgZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByZWxvYWQocGFnZSkge1xuICAgIGNvbnN0IHN0YXRlID0gcGFnZS5wYXJhbXNbXCJzdGF0ZVwiXTtcbiAgICBpZiAoc3RhdGVOYW1lcy5maW5kKHMgPT4gcy5hYmJyZXZpYXRpb24gPT09IHN0YXRlKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNob3VsZCBnZXQgZXJyb3JcIik7XG4gICAgICB0aGlzLmVycm9yKDQwNCwgXCJTdGF0ZSBOb3QgRm91bmRcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHN0YXRzID0gYXdhaXQgcmVxdWVzdHMuc3RhdGVTdGF0cyhzdGF0ZSk7XG4gICAgICByZXR1cm4geyBzdGF0ZSwgc3RhdHMgfTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgIHRoaXMuZXJyb3IoXG4gICAgICAgIDUwMCxcbiAgICAgICAgXCJUaGVyZSB3YXMgYW4gZXJyb3IgaW4gY2FsbGluZyB0aGUgYXBpLCBwbGVhc2UgdHJ5IGFnYWluIGluIDUgbWludXRlcy5cIlxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbjwvc2NyaXB0PlxuXG48c2NyaXB0PlxuICBpbXBvcnQgQ292aWRTdGF0IGZyb20gXCIuLi9jb21wb25lbnRzL0NvdmlkU3RhdC5zdmVsdGVcIjtcblxuICBpbXBvcnQgQ292aWRDaGFydCBmcm9tIFwiLi4vY29tcG9uZW50cy9Db3ZpZENoYXJ0LnN2ZWx0ZVwiO1xuXG4gIGltcG9ydCBUYWJsZUNvbnRhaW5lciBmcm9tIFwiLi4vY29tcG9uZW50cy9UYWJsZUNvbnRhaW5lci5zdmVsdGVcIjtcblxuICBleHBvcnQgbGV0IHN0YXRlO1xuICBleHBvcnQgbGV0IHN0YXRzO1xuPC9zY3JpcHQ+XG5cbjxzdmVsdGU6aGVhZD5cbiAgPHRpdGxlPkNvdmlkIDE5IC0ge3N0YXRlfTwvdGl0bGU+XG48L3N2ZWx0ZTpoZWFkPlxuXG48ZGl2IGNsYXNzPVwic2VjdGlvbiBoZWFkZXJcIj5cbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxoMT5Db3ZpZCAxOSAtIHtzdGF0ZX08L2gxPlxuICA8L2Rpdj5cbjwvZGl2PlxuXG48Q292aWRTdGF0IHsuLi5zdGF0c30gLz5cblxuPENvdmlkQ2hhcnQgLz5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQkFBZTtBQUNmLEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxTQUFTO0FBQ25CLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxRQUFRO0FBQ2xCLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxnQkFBZ0I7QUFDMUIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLFNBQVM7QUFDbkIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLFVBQVU7QUFDcEIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLFlBQVk7QUFDdEIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLFVBQVU7QUFDcEIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLGFBQWE7QUFDdkIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLFVBQVU7QUFDcEIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLHNCQUFzQjtBQUNoQyxJQUFJLFlBQVksRUFBRSxJQUFJO0FBQ3RCLEdBQUc7QUFDSCxFQUFFO0FBQ0YsSUFBSSxJQUFJLEVBQUUsZ0NBQWdDO0FBQzFDLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxTQUFTO0FBQ25CLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxTQUFTO0FBQ25CLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxNQUFNO0FBQ2hCLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxRQUFRO0FBQ2xCLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxPQUFPO0FBQ2pCLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxVQUFVO0FBQ3BCLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxTQUFTO0FBQ25CLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxNQUFNO0FBQ2hCLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxRQUFRO0FBQ2xCLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxVQUFVO0FBQ3BCLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxXQUFXO0FBQ3JCLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxPQUFPO0FBQ2pCLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxrQkFBa0I7QUFDNUIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLFVBQVU7QUFDcEIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLGVBQWU7QUFDekIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLFVBQVU7QUFDcEIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLFdBQVc7QUFDckIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLGFBQWE7QUFDdkIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLFVBQVU7QUFDcEIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLFNBQVM7QUFDbkIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLFVBQVU7QUFDcEIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLFFBQVE7QUFDbEIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLGVBQWU7QUFDekIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLFlBQVk7QUFDdEIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLFlBQVk7QUFDdEIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLFVBQVU7QUFDcEIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLGdCQUFnQjtBQUMxQixJQUFJLFlBQVksRUFBRSxJQUFJO0FBQ3RCLEdBQUc7QUFDSCxFQUFFO0FBQ0YsSUFBSSxJQUFJLEVBQUUsY0FBYztBQUN4QixJQUFJLFlBQVksRUFBRSxJQUFJO0FBQ3RCLEdBQUc7QUFDSCxFQUFFO0FBQ0YsSUFBSSxJQUFJLEVBQUUsMEJBQTBCO0FBQ3BDLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxNQUFNO0FBQ2hCLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxVQUFVO0FBQ3BCLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxRQUFRO0FBQ2xCLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxPQUFPO0FBQ2pCLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxjQUFjO0FBQ3hCLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxhQUFhO0FBQ3ZCLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxjQUFjO0FBQ3hCLElBQUksWUFBWSxFQUFFLElBQUk7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRixJQUFJLElBQUksRUFBRSxnQkFBZ0I7QUFDMUIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLGNBQWM7QUFDeEIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLFdBQVc7QUFDckIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLE9BQU87QUFDakIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLE1BQU07QUFDaEIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLFNBQVM7QUFDbkIsSUFBSSxZQUFZLEVBQUUsSUFBSTtBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGLElBQUksSUFBSSxFQUFFLGdCQUFnQjtBQUMxQixJQUFJLFlBQVksRUFBRSxJQUFJO0FBQ3RCLEdBQUc7QUFDSCxFQUFFO0FBQ0YsSUFBSSxJQUFJLEVBQUUsVUFBVTtBQUNwQixJQUFJLFlBQVksRUFBRSxJQUFJO0FBQ3RCLEdBQUc7QUFDSCxFQUFFO0FBQ0YsSUFBSSxJQUFJLEVBQUUsWUFBWTtBQUN0QixJQUFJLFlBQVksRUFBRSxJQUFJO0FBQ3RCLEdBQUc7QUFDSCxFQUFFO0FBQ0YsSUFBSSxJQUFJLEVBQUUsZUFBZTtBQUN6QixJQUFJLFlBQVksRUFBRSxJQUFJO0FBQ3RCLEdBQUc7QUFDSCxFQUFFO0FBQ0YsSUFBSSxJQUFJLEVBQUUsV0FBVztBQUNyQixJQUFJLFlBQVksRUFBRSxJQUFJO0FBQ3RCLEdBQUc7QUFDSCxFQUFFO0FBQ0YsSUFBSSxJQUFJLEVBQUUsU0FBUztBQUNuQixJQUFJLFlBQVksRUFBRSxJQUFJO0FBQ3RCLEdBQUc7QUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7MERDdk1vQixHQUFLOzRDQVNYLEdBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQUpBLEdBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0FBTCxHQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FHQUxKLEdBQUs7Ozs7bUVBS04sR0FBSzs7OzZFQUlWLEdBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUEzQ0ksT0FBTyxDQUFDLElBQUk7T0FDMUIsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTzs7S0FDN0IsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksS0FBSyxLQUFLLE1BQU0sU0FBUztFQUM5RCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQjtFQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxpQkFBaUI7Ozs7O1FBSzNCLEtBQUssU0FBUyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUs7V0FDcEMsS0FBSyxFQUFFLEtBQUs7U0FDZCxDQUFDO0VBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ2IsSUFBSSxDQUFDLEtBQUssQ0FDUixHQUFHLEVBQ0gsdUVBQXVFOzs7Ozs7T0FabEUsS0FBSztPQUNMLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=

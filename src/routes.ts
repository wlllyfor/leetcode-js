type URL = {
  url: string;
};

type routeType = {
  api: {
    alibaba: {
      product: {
        index: URL;
        find: URL;
      };
      category: {
        index: URL;
      };
    };
    guest: {
      common: {
        hub: {
          index: URL;
          find: URL;
        };
        group: {
          index: URL;
          find: URL;
        };
        jobPosition: {
          index: URL;
          find: URL;
        };
        country: {
          index: URL;
        };
        employee: {
          index: URL;
        };
        currency: {
          index: URL;
        };
      };
      enum: {
        caseProductType: {
          index: URL;
        };
        orderStatus: {
          index: URL;
        };
        orderSort: {
          index: URL;
        };
        receiveStock: {
          index: URL;
        };
        leaveStock: {
          index: URL;
        };
        mall: {
          index: URL;
        };
        receiveSearchDates: {
          index: URL;
        };
        debitStatus: {
          index: URL;
        };
        stockCreateStatus: {
          index: URL;
        };
        customerStatus: {
          index: URL;
        };
      };
    };
    customer: {
      auth: {
        login: URL;
        register: URL;
        verify: URL;
        logout: URL;
      };
      product: {
        find: URL;
        index: URL;
        store: URL;
        update: URL;
        destroy: URL;
      };
      shipToAddress: {
        find: URL;
        index: URL;
        store: URL;
        update: URL;
        destroy: URL;
      };
      shipFromAddress: {
        index: URL;
        store: URL;
        update: URL;
        destroy: URL;
      };
      order: {
        index: URL;
        store: URL;
        reOrder: URL;
        cancel: URL;
        updateBulk: URL;
        cart: {
          store: URL;
          index: URL;
        };
      };
      receiveStock: {
        store: URL;
        update: URL;
        index: URL;
        destroy: URL;
      };
      leaveStock: {
        store: URL;
        cancel: URL;
        update: URL;
        index: URL;
        destroy: URL;
      };
      me: URL;
      updateChatWork: URL;
      update: URL;
      menu: URL;
    };
    employee: {
      auth: {
        login: URL;
        register: URL;
        logout: URL;
      };
      product: {
        index: URL;
        update: URL;
        destroy: URL;
      };
      orderDetail: {
        find: URL;
        index: URL;
        update: URL;
        destroy: URL;
        updateBulk: URL;
        cancel: URL;
      };
      employeeCart: {
        store: URL;
        index: URL;
      };
      receiveStock: {
        store: URL;
        inspect: URL;
        index: URL;
        update: URL;
        destroy: URL;
        inspectableIndex: URL;
        receive: URL;
        receivableIndex: URL;
      };
      leaveStock: {
        store: URL;
        index: URL;
        find: URL;
        update: URL;
        leave: URL;
        destroy: URL;
      };
      shipToAddress: {
        find: URL;
        index: URL;
      };
      shipFromAddress: {
        index: URL;
      };
      hub: {
        index: URL;
        store: URL;
        update: URL;
        delete: URL;
      };
      tax: {
        index: URL;
        store: URL;
        update: URL;
        delete: URL;
      };
      me: URL;
      menu: URL;
      employee: {
        index: URL;
        store: URL;
        update: URL;
      };
      employeeAccount: {
        index: URL;
        store: URL;
      };
      subject: {
        index: URL;
        store: URL;
      };
      supplier: {
        index: URL;
        store: URL;
      };
      customer: {
        store: URL;
        index: URL;
      };
      plan: {
        index: URL;
      };
    };
  };

  front: {
    customer: {
      auth: {
        login: URL;
        register: URL;
        completed: URL;
      };
      myPage: URL;
      product: {
        index: URL;
      };
      shipToAddressMaster: URL;
      shipFromAddressMaster: URL;
      order: {
        cart: URL;
        cartConfirm: URL;
        oem: URL;
        history: URL;
        mall: {
          search: URL;
          product: URL;
        };
      };
      receiveStock: URL;
      leaveStock: URL;
    };
    employee: {
      auth: {
        login: URL;
        register: URL;
        completed: URL;
      };
      dashboard: URL;
      receiveStock: {
        requests: URL;
        receive: URL;
      };
      leaveStock: {
        requests: URL;
        leave: URL;
      };
      bankAccount: {
        index: URL;
      };
      customer: {
        index: URL;
      };
      product: {
        index: URL;
      };
      order: URL;
    };
  };
};

const routes: routeType = {
  api: {
    alibaba: {
      product: {
        index: {
          url: "/api/alibaba/products",
        },
        find: {
          url: "/api/alibaba/product",
        },
      },
      category: {
        index: {
          url: "/api/alibaba/categories",
        },
      },
    },
    guest: {
      common: {
        hub: {
          index: {
            url: "/api/common/hubs",
          },
          find: {
            url: "/api/common/hub",
          },
        },
        group: {
          index: {
            url: "/api/common/groups",
          },
          find: {
            url: "/api/common/group",
          },
        },
        jobPosition: {
          index: {
            url: "/api/common/job-positions",
          },
          find: {
            url: "/api/common/job-position",
          },
        },
        country: {
          index: {
            url: "/api/common/countries",
          },
        },
        employee: {
          index: {
            url: "/api/common/employees",
          },
        },
        currency: {
          index: {
            url: "/api/common/currencies",
          },
        },
      },
      enum: {
        caseProductType: {
          index: {
            url: "/api/enum/case-product-types",
          },
        },
        orderStatus: {
          index: {
            url: "/api/enum/order-statuses",
          },
        },
        orderSort: {
          index: {
            url: "/api/enum/order-sorts",
          },
        },
        receiveStock: {
          index: {
            url: "/api/enum/receive-stock-statuses",
          },
        },
        leaveStock: {
          index: {
            url: "/api/enum/leave-stock-statuses",
          },
        },
        mall: {
          index: {
            url: "/api/enum/malls",
          },
        },
        receiveSearchDates: {
          index: {
            url: "/api/enum/receive-search-dates",
          },
        },
        debitStatus: {
          index: {
            url: "/api/enum/debit-statuses",
          },
        },
        stockCreateStatus: {
          index: {
            url: "/api/enum/stock-create-statuses",
          },
        },
        customerStatus: {
          index: {
            url: "/api/enum/customer-statuses",
          },
        },
      },
    },
    customer: {
      auth: {
        login: {
          url: "/api/customer/auth/login",
        },
        register: {
          url: "/api/customer/auth/register",
        },
        verify: {
          url: "/api/customer/auth/verify",
        },
        logout: {
          url: "/api/customer/auth/logout",
        },
      },
      product: {
        find: {
          url: "/api/customer/product",
        },
        index: {
          url: "/api/customer/products",
        },
        store: {
          url: "/api/customer",
        },
        update: {
          url: "/api/customer/product/{id}",
        },
        destroy: {
          url: "/api/customer/product/{id}",
        },
      },
      shipToAddress: {
        find: {
          url: "/api/customer/ship-to-address/{id}",
        },
        index: {
          url: "/api/customer/ship-to-addresses",
        },
        store: {
          url: "/api/customer/ship-to-address",
        },
        update: {
          url: "/api/customer/ship-to-address/{id}",
        },
        destroy: {
          url: "/api/customer/ship-to-address/{id}",
        },
      },
      shipFromAddress: {
        index: {
          url: "/api/customer/ship-from-addresses",
        },
        store: {
          url: "/api/customer/ship-from-address",
        },
        update: {
          url: "/api/customer/ship-from-address/{id}",
        },
        destroy: {
          url: "/api/customer/ship-from-address/{id}",
        },
      },
      order: {
        index: {
          url: "/api/customer/orders",
        },
        store: {
          url: "/api/customer/order",
        },
        reOrder: {
          url: "/api/customer/order/re-order",
        },
        cancel: {
          url: "/api/customer/order/request-cancel",
        },
        updateBulk: {
          url: "/api/customer/order/update-bulk",
        },
        cart: {
          store: {
            url: "/api/customer/order/cart",
          },
          index: {
            url: "/api/customer/order/cart/products",
          },
        },
      },
      receiveStock: {
        index: {
          url: "/api/customer/receive-stocks",
        },
        store: {
          url: "/api/customer/receive-stock",
        },
        update: {
          url: "/api/customer/receive-stock/{id}",
        },
        destroy: {
          url: "/api/customer/receive-stock/{id}",
        },
      },
      leaveStock: {
        index: {
          url: "/api/customer/leave-stocks",
        },
        cancel: {
          url: "/api/customer/leave-stock/request-cancel",
        },
        store: {
          url: "/api/customer/leave-stock",
        },
        update: {
          url: "/api/customer/leave-stock/{id}",
        },
        destroy: {
          url: "/api/customer/leave-stock/{id}",
        },
      },
      me: {
        url: "/api/customer/me",
      },
      updateChatWork: {
        url: "/api/customer/update/chat-work",
      },
      update: {
        url: "/api/customer/update",
      },
      menu: {
        url: "/api/customer/accessible-menu",
      },
    },
    employee: {
      auth: {
        login: {
          url: "/api/employee/auth/login",
        },
        register: {
          url: "/api/employee/auth/register",
        },
        logout: {
          url: "/api/employee/auth/logout",
        },
      },
      product: {
        index: {
          url: "/api/employee/products",
        },
        update: {
          url: "/api/employee/product/{id}/update",
        },
        destroy: {
          url: "/api/employee/product/{id}/destroy",
        },
      },
      orderDetail: {
        find: {
          url: "/api/employee/order-detail/{id}",
        },
        index: {
          url: "/api/employee/order-details",
        },
        update: {
          url: "/api/employee/order-detail/{id}",
        },
        destroy: {
          url: "/api/employee/order-detail/{id}",
        },
        updateBulk: {
          url: "/api/employee/order-detail/update-bulk",
        },
        cancel: {
          url: "/api/employee/order-detail/update-status",
        },
      },
      employeeCart: {
        store: {
          url: "/api/employee/order-detail/to-cart",
        },
        index: {
          url: "/api/employee/carts",
        },
      },
      receiveStock: {
        store: {
          url: "/api/employee/receive-stock",
        },
        inspect: {
          url: "/api/employee/receive-stock-detail/inspect",
        },
        index: {
          url: "/api/employee/receive-stocks",
        },
        update: {
          url: "/api/employee/receive-stock/{id}",
        },
        destroy: {
          url: "/api/employee/receive-stock/{id}",
        },
        receive: {
          url: "/api/employee/receive-stock/receive",
        },
        inspectableIndex: {
          url: "/api/employee/receive-stock-detail/inspectable-products",
        },
        receivableIndex: {
          url: "/api/employee/receive-stock-detail/receivable-products",
        },
      },
      leaveStock: {
        store: {
          url: "/api/employee/leave-stock",
        },
        index: {
          url: "/api/employee/leave-stocks",
        },
        find: {
          url: "/api/employee/leave-stock",
        },
        update: {
          url: "/api/employee/leave-stock/{id}",
        },
        destroy: {
          url: "/api/employee/leave-stock/{id}",
        },
        leave: {
          url: "/api/employee/leave-stock/leave",
        },
      },
      shipToAddress: {
        find: {
          url: "/api/employee/ship-to-address/{id}",
        },
        index: {
          url: "/api/employee/ship-to-addresses",
        },
      },
      shipFromAddress: {
        index: {
          url: "/api/employee/ship-from-addresses",
        },
      },
      hub: {
        index: {
          url: "/api/employee/hubs",
        },
        store: {
          url: "/api/employee/hub",
        },
        update: {
          url: "/api/employee/hub",
        },
        delete: {
          url: "/api/employee/hub",
        },
      },
      tax: {
        index: {
          url: "/api/employee/taxes",
        },
        store: {
          url: "/api/employee/tax",
        },
        update: {
          url: "/api/employee/tax",
        },
        delete: {
          url: "/api/employee/tax",
        },
      },
      me: {
        url: "/api/employee/me",
      },
      menu: {
        url: "/api/employee/accessible-menu",
      },
      employee: {
        index: {
          url: "/api/employee/employees",
        },
        store: {
          url: "/api/employee/employee",
        },
        update: {
          url: "/api/employee/employee",
        },
      },
      employeeAccount: {
        index: {
          url: "/api/employee/employee_accounts",
        },
        store: {
          url: "/api/employee/employee_account",
        },
      },
      subject: {
        index: {
          url: "/api/employee/subjects",
        },
        store: {
          url: "/api/employee/subject",
        },
      },
      supplier: {
        index: {
          url: "/api/employee/suppliers",
        },
        store: {
          url: "/api/employee/supplier",
        },
      },
      customer: {
        store: {
          url: "/api/employee/customer/store",
        },
        index: {
          url: "/api/employee/customers",
        },
      },
      plan: {
        index: {
          url: "/api/employee/plans",
        },
      },
    },
  },
  front: {
    customer: {
      auth: {
        login: {
          url: "/customer/auth/login",
        },
        register: {
          url: "/customer/auth/register",
        },
        completed: {
          url: "/customer/auth/register/completed",
        },
      },
      myPage: {
        url: "/customer/mypage",
      },
      product: {
        index: {
          url: "/customer/product",
        },
      },
      shipToAddressMaster: {
        url: "/customer/ship-to-address",
      },
      shipFromAddressMaster: {
        url: "/customer/ship-from-address",
      },
      order: {
        cart: {
          url: "/customer/order/cart",
        },
        cartConfirm: {
          url: "/customer/order/cart/confirm",
        },
        oem: {
          url: "/customer/order/oem",
        },
        history: {
          url: "/customer/order/history",
        },
        mall: {
          search: {
            url: "/customer/order/mall/search",
          },
          product: {
            url: "/customer/order/mall-product",
          },
        },
      },
      receiveStock: {
        url: "/customer/receive-stock",
      },
      leaveStock: {
        url: "/customer/leave-stock",
      },
    },
    employee: {
      auth: {
        login: {
          url: "/employee/auth/login",
        },
        register: {
          url: "/employee/auth/register",
        },
        completed: {
          url: "/employee/auth/register/completed",
        },
      },
      dashboard: {
        url: "/employee/dashboard",
      },
      order: {
        url: "/employee/order",
      },
      receiveStock: {
        requests: {
          url: "/employee/receive-stock/requests",
        },
        receive: {
          url: "/employee/receive-stock/receive",
        },
      },
      leaveStock: {
        requests: {
          url: "/employee/leave-stock/requests",
        },
        leave: {
          url: "/employee/leave-stock/leave",
        },
      },
      bankAccount: {
        index: {
          url: "/employee/bank-accounts",
        },
      },
      customer: {
        index: {
          url: "/employee/customers",
        },
      },
      product: {
        index: {
          url: "/employee/customers",
        },
      },
    },
  },
};

const getCustomerFrontUrl = (hubCode: string, path: string): string => {
  return `/${hubCode}${path}`;
};

const setIdPathParam = (id: number | null, orgPath: string): string => {
  if (id) {
    return orgPath.replace("{id}", id.toString());
  }
  return orgPath;
};

export { routes, getCustomerFrontUrl, setIdPathParam };

export const ticketData = {
  "issues": [
    {
      "_id": "b46363de-8eb0-5ecf-a551-9882f18b1bb1",
      "summary": {
        "issue_id": "b46363de-8eb0-5ecf-a551-9882f18b1bb1",
        "order_id": "NS-1761640028815-0154",
        "order_details": [
          {
            "ref_id": "NS-1761640028815-0154",
            "ref_type": "ORDER"
          },
          {
            "ref_id": "pramaan_provider_1",
            "ref_type": "PROVIDER"
          },
          {
            "ref_id": "9751e10b-3f00-4f94-852d-6dccd9b24eb1",
            "ref_type": "FULFILLMENT"
          },
          {
            "ref_id": "id_13owvn_0_0",
            "ref_type": "ITEM",
            "tags": [
              {
                "descriptor": {
                  "code": "message.order.items"
                },
                "list": [
                  {
                    "descriptor": {
                      "code": "quantity.selected.count"
                    },
                    "value": "1"
                  }
                ]
              }
            ]
          }
        ],
        "issue_status": "OPEN",
        "cascade_level": "ISSUE",
        "expected_resolution_time": {
          "duration": "P1D"
        },
        "expected_response_time": {
          "duration": "PT2H"
        },
        "actors": [
          {
            "id": "63c74495-462e-5944-811b-bdd41a39de1c",
            "type": "CONSUMER",
            "info": {
              "org": {
                "name": "apistaging.nearshop.in::ONDC:RET10"
              },
              "person": {
                "name": "pramaan"
              },
              "contact": {
                "phone": "8839819474",
                "email": "tksahu1234@gmail.com"
              }
            }
          },
          {
            "id": "apistaging.nearshop.in",
            "type": "INTERFACING_NP",
            "info": {
              "org": {
                "name": "apistaging.nearshop.in::ONDC:RET10"
              },
              "contact": {
                "phone": "9049245023",
                "email": "ondc.support@nearshop.com"
              },
              "person": {
                "name": "Nearshop Buyer Admin"
              }
            }
          },
          {
            "id": "4811f292-b9ef-5c68-a5e2-9332d9f35306",
            "type": "COUNTERPARTY_NP",
            "info": {
              "org": {
                "name": "undefined::ONDC:RET10"
              },
              "contact": {
                "phone": "9350657100",
                "email": "admin@nearshop.com"
              },
              "person": {
                "name": "Nearshop Admin"
              }
            }
          }
        ],
        "actions": [
          {
            "id": "d37019d5-7569-5e16-949c-e200b8982ed7",
            "descriptor": {
              "code": "OPEN",
              "short_desc": "Complaint created"
            },
            "updated_at": "2025-10-28T08:33:54.979Z",
            "action_by": "apistaging.nearshop.in",
            "actor_details": {
              "name": "pramaan"
            }
          },
          {
            "id": "51c220bf-3c34-53a5-9845-deaecb16527f",
            "descriptor": {
              "code": "PROCESSING",
              "short_desc": "Complaint created"
            },
            "updated_at": "2025-10-31T10:17:11.348Z",
            "action_by": "4811f292-b9ef-5c68-a5e2-9332d9f35306",
            "actor_details": {
              "name": "Nearshop Admin"
            }
          }
        ],
        "descriptor": {
          "code": "ORD01",
          "short_desc": "test",
          "long_desc": "test",
          "additional_desc": {
            "url": "https://interfacing.app/addtional-details/img1.png",
            "content_type": "text/plain"
          },
          "images": []
        },
        "created_at": "2025-10-28T08:33:54.979Z",
        "updated_at": "2025-10-31T10:17:11.348Z",
        "undefined": "63c74495-462e-5944-811b-bdd41a39de1c",
        "complainant_id": "apistaging.nearshop.in"
      },
      "details": {
        "issue_id": "b46363de-8eb0-5ecf-a551-9882f18b1bb1",
        "issue_open": {
          "context": {
            "domain": "ONDC:RET10",
            "country": "IND",
            "city": "*",
            "action": "issue",
            "core_version": "1.2.5",
            "bap_id": "apistaging.nearshop.in",
            "bap_uri": "https://apistaging.nearshop.in/bap/api/v1",
            "transaction_id": "65f22555-3235-5fda-b902-33378c4a710e",
            "message_id": "40b5fca8-eff6-5c2a-9181-2afd9c785ed6",
            "timestamp": "2025-10-31T10:17:11.346Z",
            "ttl": "PT30S",
            "bpp_id": null,
            "bpp_uri": null
          },
          "message": {
            "issue": {
              "id": "b46363de-8eb0-5ecf-a551-9882f18b1bb1",
              "status": "OPEN",
              "level": "ISSUE",
              "created_at": "2025-10-28T08:33:54.979Z",
              "updated_at": "2025-10-28T08:33:54.979Z",
              "expected_response_time": {
                "duration": "PT2H"
              },
              "expected_resolution_time": {
                "duration": "P1D"
              },
              "refs": [
                {
                  "ref_id": "NS-1761640028815-0154",
                  "ref_type": "ORDER"
                },
                {
                  "ref_id": "pramaan_provider_1",
                  "ref_type": "PROVIDER"
                },
                {
                  "ref_id": "9751e10b-3f00-4f94-852d-6dccd9b24eb1",
                  "ref_type": "FULFILLMENT"
                },
                {
                  "ref_id": "id_13owvn_0_0",
                  "ref_type": "ITEM",
                  "tags": [
                    {
                      "descriptor": {
                        "code": "message.order.items"
                      },
                      "list": [
                        {
                          "descriptor": {
                            "code": "quantity.selected.count"
                          },
                          "value": "1"
                        }
                      ]
                    }
                  ]
                }
              ],
              "actors": [
                {
                  "id": "63c74495-462e-5944-811b-bdd41a39de1c",
                  "type": "CONSUMER",
                  "info": {
                    "org": {
                      "name": "apistaging.nearshop.in::ONDC:RET10"
                    },
                    "person": {
                      "name": "pramaan"
                    },
                    "contact": {
                      "phone": "8839819474",
                      "email": "tksahu1234@gmail.com"
                    }
                  }
                },
                {
                  "id": "apistaging.nearshop.in",
                  "type": "INTERFACING_NP",
                  "info": {
                    "org": {
                      "name": "apistaging.nearshop.in::ONDC:RET10"
                    },
                    "contact": {
                      "phone": "9049245023",
                      "email": "ondc.support@nearshop.com"
                    },
                    "person": {
                      "name": "Nearshop Buyer Admin"
                    }
                  }
                },
                {
                  "id": "4811f292-b9ef-5c68-a5e2-9332d9f35306",
                  "type": "COUNTERPARTY_NP",
                  "info": {
                    "org": {
                      "name": "undefined::ONDC:RET10"
                    },
                    "contact": {
                      "phone": "9350657100",
                      "email": "admin@nearshop.com"
                    },
                    "person": {
                      "name": "Nearshop Admin"
                    }
                  }
                }
              ],
              "source_id": "63c74495-462e-5944-811b-bdd41a39de1c",
              "complainant_id": "apistaging.nearshop.in",
              "descriptor": {
                "code": "ORD01",
                "short_desc": "test",
                "long_desc": "test",
                "additional_desc": {
                  "url": "https://interfacing.app/addtional-details/img1.png",
                  "content_type": "text/plain"
                },
                "images": []
              },
              "last_action_id": "d37019d5-7569-5e16-949c-e200b8982ed7",
              "actions": [
                {
                  "id": "d37019d5-7569-5e16-949c-e200b8982ed7",
                  "descriptor": {
                    "code": "OPEN",
                    "short_desc": "Complaint created"
                  },
                  "updated_at": "2025-10-28T08:33:54.979Z",
                  "action_by": "apistaging.nearshop.in",
                  "actor_details": {
                    "name": "pramaan"
                  }
                },
                {
                  "id": "51c220bf-3c34-53a5-9845-deaecb16527f",
                  "descriptor": {
                    "code": "PROCESSING",
                    "short_desc": "Complaint created"
                  },
                  "updated_at": "2025-10-31T10:17:11.348Z",
                  "action_by": "4811f292-b9ef-5c68-a5e2-9332d9f35306",
                  "actor_details": {
                    "name": "Nearshop Admin"
                  }
                }
              ]
            }
          }
        },
        "on_issue": {
          "context": {
            "domain": "ONDC:RET10",
            "country": "IND",
            "city": "*",
            "action": "on_issue",
            "core_version": "1.2.5",
            "bap_id": "apistaging.nearshop.in",
            "bap_uri": "https://apistaging.nearshop.in/bap/api/v1",
            "transaction_id": "65f22555-3235-5fda-b902-33378c4a710e",
            "message_id": "40b5fca8-eff6-5c2a-9181-2afd9c785ed6",
            "timestamp": "2025-10-31T10:17:11.348Z",
            "ttl": "PT30S",
            "bpp_id": null,
            "bpp_uri": null
          },
          "message": {
            "update_target": [
              {
                "path": "issue.actions",
                "action": "APPENDED"
              }
            ],
            "issue": {
              "id": "b46363de-8eb0-5ecf-a551-9882f18b1bb1",
              "status": "PROCESSING",
              "level": "ISSUE",
              "expected_response_time": {
                "duration": "PT2H"
              },
              "expected_resolution_time": {
                "duration": "P1D"
              },
              "refs": [
                {
                  "ref_id": "NS-1761640028815-0154",
                  "ref_type": "ORDER"
                },
                {
                  "ref_id": "pramaan_provider_1",
                  "ref_type": "PROVIDER"
                },
                {
                  "ref_id": "9751e10b-3f00-4f94-852d-6dccd9b24eb1",
                  "ref_type": "FULFILLMENT"
                },
                {
                  "ref_id": "id_13owvn_0_0",
                  "ref_type": "ITEM",
                  "tags": [
                    {
                      "descriptor": {
                        "code": "message.order.items"
                      },
                      "list": [
                        {
                          "descriptor": {
                            "code": "quantity.selected.count"
                          },
                          "value": "1"
                        }
                      ]
                    }
                  ]
                }
              ],
              "actors": [
                {
                  "id": "63c74495-462e-5944-811b-bdd41a39de1c",
                  "type": "CONSUMER",
                  "info": {
                    "org": {
                      "name": "apistaging.nearshop.in::ONDC:RET10"
                    },
                    "person": {
                      "name": "pramaan"
                    },
                    "contact": {
                      "phone": "8839819474",
                      "email": "tksahu1234@gmail.com"
                    }
                  }
                },
                {
                  "id": "apistaging.nearshop.in",
                  "type": "INTERFACING_NP",
                  "info": {
                    "org": {
                      "name": "apistaging.nearshop.in::ONDC:RET10"
                    },
                    "contact": {
                      "phone": "9049245023",
                      "email": "ondc.support@nearshop.com"
                    },
                    "person": {
                      "name": "Nearshop Buyer Admin"
                    }
                  }
                },
                {
                  "id": "4811f292-b9ef-5c68-a5e2-9332d9f35306",
                  "type": "COUNTERPARTY_NP",
                  "info": {
                    "org": {
                      "name": "undefined::ONDC:RET10"
                    },
                    "contact": {
                      "phone": "9350657100",
                      "email": "admin@nearshop.com"
                    },
                    "person": {
                      "name": "Nearshop Admin"
                    }
                  }
                }
              ],
              "source_id": "63c74495-462e-5944-811b-bdd41a39de1c",
              "complainant_id": "apistaging.nearshop.in",
              "respondent_ids": [
                "undefined"
              ],
              "descriptor": {
                "code": "ORD01",
                "short_desc": "test",
                "long_desc": "test",
                "additional_desc": {
                  "url": "https://interfacing.app/addtional-details/img1.png",
                  "content_type": "text/plain"
                },
                "images": []
              },
              "last_action_id": "A2",
              "actions": [
                {
                  "id": "d37019d5-7569-5e16-949c-e200b8982ed7",
                  "descriptor": {
                    "code": "OPEN",
                    "short_desc": "Complaint created"
                  },
                  "updated_at": "2025-10-28T08:33:54.979Z",
                  "action_by": "apistaging.nearshop.in",
                  "actor_details": {
                    "name": "pramaan"
                  }
                },
                {
                  "id": "51c220bf-3c34-53a5-9845-deaecb16527f",
                  "descriptor": {
                    "code": "PROCESSING",
                    "short_desc": "Complaint created"
                  },
                  "updated_at": "2025-10-31T10:17:11.348Z",
                  "action_by": "4811f292-b9ef-5c68-a5e2-9332d9f35306",
                  "actor_details": {
                    "name": "Nearshop Admin"
                  }
                }
              ],
              "created_at": "2025-10-28T08:33:54.979Z",
              "updated_at": "2025-10-31T10:17:11.348Z"
            }
          }
        }
      }
    }
  ]
}
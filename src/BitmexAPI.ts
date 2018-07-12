/** THIS FILE IS AUTOMATICALLY GENERATED FROM : https://www.bitmex.com/api/explorer/swagger.json **/
import { BitmexAbstractAPI } from "./BitmexAbstractAPI";
import * as BITMEX from "./BitmexInterfaces";
export class BitmexAPI extends BitmexAbstractAPI {
    readonly basePath = 'https://www.bitmex.com/api/v1';

    public Announcement = {

        /**
         * Get site announcements.
         */
        get: async (qs : BITMEX.AnnouncementQuery = {}) =>
            this.request<BITMEX.Announcement[]>('GET', '/announcement', { qs }),

        /**
         * @Authorized
         * Get urgent (banner) announcements.
         */
        getUrgent: async () =>
            this.request<BITMEX.Announcement[]>('GET', '/announcement/urgent', {}, true),
    }

    public APIKey = {

        /**
         * @Authorized
         * Create a new API Key.API Keys can only be created via the frontend.
         */
        new: async (formData : BITMEX.ApiKeyPost = {}) =>
            this.request<BITMEX.APIKey>('POST', '/apiKey', { formData }, true),

        /**
         * @Authorized
         * Get your API Keys.
         */
        get: async (qs : BITMEX.ApiKeyQuery = {}) =>
            this.request<BITMEX.APIKey[]>('GET', '/apiKey', { qs }, true),

        /**
         * @Authorized
         * Remove an API Key.
         */
        remove: async (formData : BITMEX.ApiKeyDelete) =>
            this.request<{ success : boolean; }>('DELETE', '/apiKey', { formData }, true),

        /**
         * @Authorized
         * Disable an API Key.
         */
        disable: async (formData : BITMEX.ApiKeyDisablePost) =>
            this.request<BITMEX.APIKey>('POST', '/apiKey/disable', { formData }, true),

        /**
         * @Authorized
         * Enable an API Key.
         */
        enable: async (formData : BITMEX.ApiKeyEnablePost) =>
            this.request<BITMEX.APIKey>('POST', '/apiKey/enable', { formData }, true),
    }

    public Chat = {

        /**
         * Get chat messages.
         */
        get: async (qs : BITMEX.ChatQuery = {}) =>
            this.request<BITMEX.Chat[]>('GET', '/chat', { qs }),

        /**
         * @Authorized
         * Send a chat message.
         */
        new: async (formData : BITMEX.ChatPost) =>
            this.request<BITMEX.Chat>('POST', '/chat', { formData }, true),

        /**
         * Get available channels.
         */
        getChannels: async () =>
            this.request<BITMEX.ChatChannel[]>('GET', '/chat/channels', {}),

        /**
         * Get connected users.Returns an array with browser users in the first position and API users (bots) in the second position.
         */
        getConnected: async () =>
            this.request<BITMEX.ConnectedUsers>('GET', '/chat/connected', {}),
    }

    public Execution = {

        /**
         * @Authorized
         * Get all raw executions for your account.This returns all raw transactions, which includes order opening and cancelation, and order status
         * changes.
         * It can be quite noisy.
         * More focused information is available at `/execution/tradeHistory`.
         * 
         * You may also use the `filter` param to target your query.
         * Specify an array as a filter value, such as
         * `{"execType": ["Settlement", "Trade"]}` to filter on multiple values.
         * See [the FIX Spec](http://www.onixs.biz/fix-dictionary/5.0.SP2/msgType_8_8.html) for explanations of these fields.
         */
        get: async (qs : BITMEX.ExecutionQuery = {}) =>
            this.request<BITMEX.Execution[]>('GET', '/execution', { qs }, true),

        /**
         * @Authorized
         * Get all balance-affecting executions.
         * This includes each trade, insurance charge, and settlement.
         */
        getTradeHistory: async (qs : BITMEX.ExecutionTradeHistoryQuery = {}) =>
            this.request<BITMEX.Execution[]>('GET', '/execution/tradeHistory', { qs }, true),
    }

    public Funding = {

        /**
         * Get funding history.
         */
        get: async (qs : BITMEX.FundingQuery = {}) =>
            this.request<BITMEX.Funding[]>('GET', '/funding', { qs }),
    }

    public Instrument = {

        /**
         * Get instruments.This returns all instruments and indices, including those that have settled or are unlisted.
         * Use this endpoint if you want to query for individual instruments or use a complex filter.
         * Use `/instrument/active` to return active instruments, or use a filter like `{"state": "Open"}`.
         */
        get: async (qs : BITMEX.InstrumentQuery = {}) =>
            this.request<BITMEX.Instrument[]>('GET', '/instrument', { qs }),

        /**
         * Get all active instruments and instruments that have expired in <24hrs.
         */
        getActive: async () =>
            this.request<BITMEX.Instrument[]>('GET', '/instrument/active', {}),

        /**
         * Get all price indices.
         */
        getIndices: async () =>
            this.request<BITMEX.Instrument[]>('GET', '/instrument/indices', {}),

        /**
         * Helper method.
         * Gets all active instruments and all indices.
         * This is a join of the result of /indices and /active.
         */
        getActiveAndIndices: async () =>
            this.request<BITMEX.Instrument[]>('GET', '/instrument/activeAndIndices', {}),

        /**
         * Return all active contract series and interval pairs.This endpoint is useful for determining which pairs are live.
         * It returns two arrays of   strings.
         * The first is intervals, such as `["XBT:perpetual", "XBT:monthly", "XBT:quarterly", "ETH:monthly", ...]`. These identifiers are usable in any query's `symbol` param.
         * The second array is the current resolution of these intervals.
         * Results are mapped at the same index.
         */
        getActiveIntervals: async () =>
            this.request<BITMEX.InstrumentInterval>('GET', '/instrument/activeIntervals', {}),

        /**
         * Show constituent parts of an index.Composite indices are built from multiple external price sources.
         * Use this endpoint to get the underlying prices of an index.
         * For example, send a `symbol` of `.XBT` to
         * get the ticks and weights of the constituent exchanges that build the ".XBT" index.
         * A tick with reference `"BMI"` and weight `null` is the composite index tick.
         */
        getCompositeIndex: async (qs : BITMEX.InstrumentCompositeIndexQuery = {}) =>
            this.request<BITMEX.IndexComposite[]>('GET', '/instrument/compositeIndex', { qs }),
    }

    public Insurance = {

        /**
         * Get insurance fund history.
         */
        get: async (qs : BITMEX.InsuranceQuery = {}) =>
            this.request<BITMEX.Insurance[]>('GET', '/insurance', { qs }),
    }

    public Leaderboard = {

        /**
         * Get current leaderboard.
         */
        get: async (qs : BITMEX.LeaderboardQuery = {}) =>
            this.request<BITMEX.Leaderboard[]>('GET', '/leaderboard', { qs }),

        /**
         * @Authorized
         * Get your alias on the leaderboard.
         */
        getName: async () =>
            this.request<{ name : string; }>('GET', '/leaderboard/name', {}, true),
    }

    public Liquidation = {

        /**
         * Get liquidation orders.
         */
        get: async (qs : BITMEX.LiquidationQuery = {}) =>
            this.request<BITMEX.Liquidation[]>('GET', '/liquidation', { qs }),
    }

    public Notification = {

        /**
         * @Authorized
         * Get your current notifications.This is an upcoming feature and currently does not return data.
         */
        get: async () =>
            this.request<BITMEX.Notification[]>('GET', '/notification', {}, true),
    }

    public Order = {

        /**
         * @Authorized
         * Get your orders.To get open orders only, send {"open": true} in the filter param.
         * See <a href="http://www.onixs.biz/fix-dictionary/5.0.SP2/msgType_D_68.html">the FIX Spec</a> for explanations of these fields.
         */
        getOrders: async (qs : BITMEX.OrderQuery = {}) =>
            this.request<BITMEX.Order[]>('GET', '/order', { qs }, true),

        /**
         * @Authorized
         * Create a new order.## Placing Orders
         * 
         * This endpoint is used for placing orders.
         * See individual fields below for more details on their use.
         * #### Order Types
         * 
         * All orders require a `symbol`. All other fields are optional except when otherwise specified.
         * These are the valid `ordType`s:
         * 
         * * **Limit**: The default order type.
         * Specify an `orderQty` and `price`.
         * * **Market**: A traditional Market order.
         * A Market order will execute until filled or your bankruptcy price is reached, at
         *   which point it will cancel.
         * * **MarketWithLeftOverAsLimit**: A market order that, after eating through the order book as far as
         *   permitted by available margin, will become a limit order.
         * The difference between this type and `Market` only
         *   affects the behavior in thin books.
         * Upon reaching the deepest possible price, if there is quantity left over,
         *   a `Market` order will cancel the remaining quantity.
         * `MarketWithLeftOverAsLimit` will keep the remaining
         *   quantity in the books as a `Limit`.
         * * **Stop**: A Stop Market order.
         * Specify an `orderQty` and `stopPx`. When the `stopPx` is reached, the order will be entered
         *   into the book.
         * * On sell orders, the order will trigger if the triggering price is lower than the `stopPx`. On buys, higher.
         * * Note: Stop orders do not consume margin until triggered.
         * Be sure that the required margin is available in your
         *     account so that it may trigger fully.
         * * `Close` Stops don't require an `orderQty`. See Execution Instructions below.
         * * **StopLimit**: Like a Stop Market, but enters a Limit order instead of a Market order.
         * Specify an `orderQty`, `stopPx`,
         *   and `price`.
         * * **MarketIfTouched**: Similar to a Stop, but triggers are done in the opposite direction.
         * Useful for Take Profit orders.
         * * **LimitIfTouched**: As above; use for Take Profit Limit orders.
         * #### Execution Instructions
         * 
         * The following `execInst`s are supported.
         * If using multiple, separate with a comma (e.g. `LastPrice,Close`).
         * 
         * * **ParticipateDoNotInitiate**: Also known as a Post-Only order.
         * If this order would have executed on placement,
         *   it will cancel instead.
         * * **AllOrNone**: Valid only for hidden orders (`displayQty: 0`). Use to only execute if the entire order would fill.
         * * **MarkPrice, LastPrice, IndexPrice**: Used by stop and if-touched orders to determine the triggering price.
         * Use only one.
         * By default, `'MarkPrice'` is used.
         * Also used for Pegged orders to define the value of `'LastPeg'`.
         * * **ReduceOnly**: A `'ReduceOnly'` order can only reduce your position, not increase it.
         * If you have a `'ReduceOnly'`
         *   limit order that rests in the order book while the position is reduced by other orders, then its order quantity will
         *   be amended down or canceled.
         * If there are multiple `'ReduceOnly'` orders the least agresssive will be amended first.
         * * **Close**: `'Close'` implies `'ReduceOnly'`. A `'Close'` order will cancel other active limit orders with the same side
         *   and symbol if the open quantity exceeds the current position.
         * This is useful for stops: by canceling these orders, a
         *   `'Close'` Stop is ensured to have the margin required to execute, and can only execute up to the full size of your
         *   position.
         * If `orderQty` is not specified, a `'Close'` order has an `orderQty` equal to your current position's size.
         * * Note that a `Close` order without an `orderQty` requires a `side`, so that BitMEX knows if it should trigger
         *   above or below the `stopPx`.
         * 
         * #### Linked Orders
         * 
         * Linked Orders are an advanced capability.
         * It is very powerful, but its use requires careful coding and testing.
         * Please follow this document carefully and use the [Testnet Exchange](https://testnet.bitmex.com) while developing.
         * BitMEX offers four advanced Linked Order types:
         * 
         * * **OCO**: *One Cancels the Other*. A very flexible version of the standard Stop / Take Profit technique.
         * Multiple orders may be linked together using a single `clOrdLinkID`. Send a `contingencyType` of
         *   `OneCancelsTheOther` on the orders.
         * The first order that fully or partially executes (or activates
         *   for `Stop` orders) will cancel all other orders with the same `clOrdLinkID`.
         * * **OTO**: *One Triggers the Other*. Send a `contingencyType` of `'OneTriggersTheOther'` on the primary order and
         *   then subsequent orders with the same `clOrdLinkID` will be not be triggered until the primary order fully executes.
         * * **OUOA**: *One Updates the Other Absolute*. Send a `contingencyType` of `'OneUpdatesTheOtherAbsolute'` on the orders.
         * Then
         *   as one order has a execution, other orders with the same `clOrdLinkID` will have their order quantity amended
         *   down by the execution quantity.
         * * **OUOP**: *One Updates the Other Proportional*. Send a `contingencyType` of `'OneUpdatesTheOtherProportional'` on the orders.
         * Then
         *   as one order has a execution, other orders with the same `clOrdLinkID` will have their order quantity reduced proportionally
         *   by the fill percentage.
         * #### Trailing Stops
         * 
         * You may use `pegPriceType` of `'TrailingStopPeg'` to create Trailing Stops.
         * The pegged `stopPx` will move as the market
         * moves away from the peg, and freeze as the market moves toward it.
         * To use, combine with `pegOffsetValue` to set the `stopPx` of your order.
         * The peg is set to the triggering price
         * specified in the `execInst` (default `'MarkPrice'`). Use a negative offset for stop-sell and buy-if-touched orders.
         * Requires `ordType`: `'Stop', 'StopLimit', 'MarketIfTouched', 'LimitIfTouched'`.
         * 
         * #### Simple Quantities
         * 
         * Send a `simpleOrderQty` instead of an `orderQty` to create an order denominated in the underlying currency.
         * This is useful for opening up a position with 1 XBT of exposure without having to calculate how many contracts it is.
         * #### Rate Limits
         * 
         * See the [Bulk Order Documentation](#!/Order/Order_newBulk) if you need to place multiple orders at the same time.
         * Bulk orders require fewer risk checks in the trading engine and thus are ratelimited at **1/10** the normal rate.
         * You can also improve your reactivity to market movements while staying under your ratelimit by using the
         * [Amend](#!/Order/Order_amend) and [Amend Bulk](#!/Order/Order_amendBulk) endpoints.
         * This allows you to stay
         * in the market and avoids the cancel/replace cycle.
         * #### Tracking Your Orders
         * 
         * If you want to keep track of order IDs yourself, set a unique `clOrdID` per order.
         * This `clOrdID` will come back as a property on the order and any related executions (including on the WebSocket),
         * and can be used to get or cancel the order.
         * Max length is 36 characters.
         * You can also change the `clOrdID` by amending an order, supplying an `origClOrdID`, and your desired new
         * ID as the `clOrdID` param, like so:
         * 
         * ```
         * # Amends an order's leavesQty, and updates its clOrdID to "def-456"
         * PUT /api/v1/order {"origClOrdID": "abc-123", "clOrdID": "def-456", "leavesQty": 1000}
         * ```
         */
        new: async (formData : BITMEX.OrderPost) =>
            this.request<BITMEX.Order>('POST', '/order', { formData }, true),

        /**
         * @Authorized
         * Amend the quantity or price of an open order.Send an `orderID` or `origClOrdID` to identify the order you wish to amend.
         * Both order quantity and price can be amended.
         * Only one `qty` field can be used to amend.
         * Use the `leavesQty` field to specify how much of the order you wish to remain open.
         * This can be useful
         * if you want to adjust your position's delta by a certain amount, regardless of how much of the order has
         * already filled.
         * > A `leavesQty` can be used to make a "Filled" order live again, if it is received within 60 seconds of the fill.
         * Use the `simpleOrderQty` and `simpleLeavesQty` fields to specify order size in Bitcoin, rather than contracts.
         * These fields will round up to the nearest contract.
         * Like order placement, amending can be done in bulk.
         * Simply send a request to `PUT /api/v1/order/bulk` with
         * a JSON body of the shape: `{"orders": [{...}, {...}]}`, each object containing the fields used in this endpoint.
         */
        amend: async (formData : BITMEX.OrderPut = {}) =>
            this.request<BITMEX.Order>('PUT', '/order', { formData }, true),

        /**
         * @Authorized
         * Cancel order(s). Send multiple order IDs to cancel in bulk.Either an orderID or a clOrdID must be provided.
         */
        cancel: async (formData : BITMEX.OrderDelete = {}) =>
            this.request<BITMEX.Order[]>('DELETE', '/order', { formData }, true),

        /**
         * @Authorized
         * Create multiple new orders for the same symbol.This endpoint is used for placing bulk orders.
         * Valid order types are Market, Limit, Stop, StopLimit, MarketIfTouched, LimitIfTouched, MarketWithLeftOverAsLimit, and Pegged.
         * Each individual order object in the array should have the same properties as an individual POST /order call.
         * This endpoint is much faster for getting many orders into the book at once.
         * Because it reduces load on BitMEX
         * systems, this endpoint is ratelimited at `ceil(0.1 * orders)`. Submitting 10 orders via a bulk order call
         * will only count as 1 request, 15 as 2, 32 as 4, and so on.
         * For now, only `application/json` is supported on this endpoint.
         */
        newBulk: async (formData : BITMEX.OrderBulkPost = {}) =>
            this.request<BITMEX.Order[]>('POST', '/order/bulk', { formData }, true),

        /**
         * @Authorized
         * Amend multiple orders for the same symbol.Similar to POST /amend, but with multiple orders.
         * `application/json` only.
         * Ratelimited at 10%.
         */
        amendBulk: async (formData : BITMEX.OrderBulkPut = {}) =>
            this.request<BITMEX.Order[]>('PUT', '/order/bulk', { formData }, true),

        /**
         * @Authorized
         * Close a position.
         * [Deprecated, use POST /order with execInst: 'Close']If no `price` is specified, a market order will be submitted to close the whole of your position.
         * This will also close all other open orders in this symbol.
         */
        closePosition: async (formData : BITMEX.OrderClosePositionPost) =>
            this.request<BITMEX.Order>('POST', '/order/closePosition', { formData }, true),

        /**
         * @Authorized
         * Cancels all of your orders.
         */
        cancelAll: async (formData : BITMEX.OrderAllDelete = {}) =>
            this.request<BITMEX.Order[]>('DELETE', '/order/all', { formData }, true),

        /**
         * @Authorized
         * Automatically cancel all your orders after a specified timeout.Useful as a dead-man's switch to ensure your orders are canceled in case of an outage.
         * If called repeatedly, the existing offset will be canceled and a new one will be inserted in its place.
         * Example usage: call this route at 15s intervals with an offset of 60000 (60s).
         * If this route is not called within 60 seconds, all your orders will be automatically canceled.
         * This is also available via [WebSocket](https://www.bitmex.com/app/wsAPI#Dead-Mans-Switch-Auto-Cancel).
         */
        cancelAllAfter: async (formData : BITMEX.OrderCancelAllAfterPost) =>
            this.request<any>('POST', '/order/cancelAllAfter', { formData }, true),
    }

    public OrderBook = {

        /**
         * Get current orderbook in vertical format.
         */
        getL2: async (qs : BITMEX.OrderBookL2Query) =>
            this.request<BITMEX.OrderBookL2[]>('GET', '/orderBook/L2', { qs }),
    }

    public Position = {

        /**
         * @Authorized
         * Get your positions.See <a href="http://www.onixs.biz/fix-dictionary/5.0.SP2/msgType_AP_6580.html">the FIX Spec</a> for explanations of these fields.
         */
        get: async (qs : BITMEX.PositionQuery = {}) =>
            this.request<BITMEX.Position[]>('GET', '/position', { qs }, true),

        /**
         * @Authorized
         * Enable isolated margin or cross margin per-position.
         */
        isolateMargin: async (formData : BITMEX.PositionIsolatePost) =>
            this.request<BITMEX.Position>('POST', '/position/isolate', { formData }, true),

        /**
         * @Authorized
         * Update your risk limit.
         */
        updateRiskLimit: async (formData : BITMEX.PositionRiskLimitPost) =>
            this.request<BITMEX.Position>('POST', '/position/riskLimit', { formData }, true),

        /**
         * @Authorized
         * Transfer equity in or out of a position.
         */
        transferIsolatedMargin: async (formData : BITMEX.PositionTransferMarginPost) =>
            this.request<BITMEX.Position>('POST', '/position/transferMargin', { formData }, true),

        /**
         * @Authorized
         * Choose leverage for a position.
         */
        updateLeverage: async (formData : BITMEX.PositionLeveragePost) =>
            this.request<BITMEX.Position>('POST', '/position/leverage', { formData }, true),
    }

    public Quote = {

        /**
         * Get Quotes.
         */
        get: async (qs : BITMEX.QuoteQuery = {}) =>
            this.request<BITMEX.Quote[]>('GET', '/quote', { qs }),

        /**
         * Get previous quotes in time buckets.
         */
        getBucketed: async (qs : BITMEX.QuoteBucketedQuery = {}) =>
            this.request<BITMEX.Quote[]>('GET', '/quote/bucketed', { qs }),
    }

    public Schema = {

        /**
         * Get model schemata for data objects returned by this API.
         */
        get: async (qs : BITMEX.SchemaQuery = {}) =>
            this.request<any>('GET', '/schema', { qs }),

        /**
         * Returns help text & subject list for websocket usage.
         */
        websocketHelp: async () =>
            this.request<any>('GET', '/schema/websocketHelp', {}),
    }

    public Settlement = {

        /**
         * Get settlement history.
         */
        get: async (qs : BITMEX.SettlementQuery = {}) =>
            this.request<BITMEX.Settlement[]>('GET', '/settlement', { qs }),
    }

    public Stats = {

        /**
         * Get exchange-wide and per-series turnover and volume statistics.
         */
        get: async () =>
            this.request<BITMEX.Stats[]>('GET', '/stats', {}),

        /**
         * Get historical exchange-wide and per-series turnover and volume statistics.
         */
        history: async () =>
            this.request<BITMEX.StatsHistory[]>('GET', '/stats/history', {}),

        /**
         * Get a summary of exchange statistics in USD.
         */
        historyUSD: async () =>
            this.request<BITMEX.StatsUSD[]>('GET', '/stats/historyUSD', {}),
    }

    public Trade = {

        /**
         * Get Trades.Please note that indices (symbols starting with `.`) post trades at intervals to the trade feed.
         * These have a `size` of 0 and are used only to indicate a changing price.
         * See [the FIX Spec](http://www.onixs.biz/fix-dictionary/5.0.SP2/msgType_AE_6569.html) for explanations of these fields.
         */
        get: async (qs : BITMEX.TradeQuery = {}) =>
            this.request<BITMEX.Trade[]>('GET', '/trade', { qs }),

        /**
         * Get previous trades in time buckets.
         */
        getBucketed: async (qs : BITMEX.TradeBucketedQuery = {}) =>
            this.request<BITMEX.TradeBin[]>('GET', '/trade/bucketed', { qs }),
    }

    public User = {

        /**
         * @Authorized
         * Get a deposit address.
         */
        getDepositAddress: async (qs : BITMEX.UserDepositAddressQuery = {}) =>
            this.request<string>('GET', '/user/depositAddress', { qs }, true),

        /**
         * @Authorized
         * Get your current wallet information.
         */
        getWallet: async (qs : BITMEX.UserWalletQuery = {}) =>
            this.request<BITMEX.Wallet>('GET', '/user/wallet', { qs }, true),

        /**
         * @Authorized
         * Get a history of all of your wallet transactions (deposits, withdrawals, PNL).
         */
        getWalletHistory: async (qs : BITMEX.UserWalletHistoryQuery = {}) =>
            this.request<BITMEX.Transaction[]>('GET', '/user/walletHistory', { qs }, true),

        /**
         * @Authorized
         * Get a summary of all of your wallet transactions (deposits, withdrawals, PNL).
         */
        getWalletSummary: async (qs : BITMEX.UserWalletSummaryQuery = {}) =>
            this.request<BITMEX.Transaction[]>('GET', '/user/walletSummary', { qs }, true),

        /**
         * Get the minimum withdrawal fee for a currency.This is changed based on network conditions to ensure timely withdrawals.
         * During network congestion, this may be high.
         * The fee is returned in the same currency.
         */
        minWithdrawalFee: async (qs : BITMEX.UserMinWithdrawalFeeQuery = {}) =>
            this.request<any>('GET', '/user/minWithdrawalFee', { qs }),

        /**
         * @Authorized
         * Request a withdrawal to an external wallet.This will send a confirmation email to the email address on record, unless requested via an API Key with the `withdraw` permission.
         */
        requestWithdrawal: async (formData : BITMEX.UserRequestWithdrawalPost) =>
            this.request<BITMEX.Transaction>('POST', '/user/requestWithdrawal', { formData }, true),

        /**
         * Cancel a withdrawal.
         */
        cancelWithdrawal: async (formData : BITMEX.UserCancelWithdrawalPost) =>
            this.request<BITMEX.Transaction>('POST', '/user/cancelWithdrawal', { formData }),

        /**
         * Confirm a withdrawal.
         */
        confirmWithdrawal: async (formData : BITMEX.UserConfirmWithdrawalPost) =>
            this.request<BITMEX.Transaction>('POST', '/user/confirmWithdrawal', { formData }),

        /**
         * @Authorized
         * Get secret key for setting up two-factor auth.Use /confirmEnableTFA directly for Yubikeys.
         * This fails if TFA is already enabled.
         */
        requestEnableTFA: async (formData : BITMEX.UserRequestEnableTFAPost = {}) =>
            this.request<boolean>('POST', '/user/requestEnableTFA', { formData }, true),

        /**
         * @Authorized
         * Confirm two-factor auth for this account.
         * If using a Yubikey, simply send a token to this endpoint.
         */
        confirmEnableTFA: async (formData : BITMEX.UserConfirmEnableTFAPost) =>
            this.request<boolean>('POST', '/user/confirmEnableTFA', { formData }, true),

        /**
         * @Authorized
         * Disable two-factor auth for this account.
         */
        disableTFA: async (formData : BITMEX.UserDisableTFAPost) =>
            this.request<boolean>('POST', '/user/disableTFA', { formData }, true),

        /**
         * Confirm your email address with a token.
         */
        confirm: async (formData : BITMEX.UserConfirmEmailPost) =>
            this.request<BITMEX.AccessToken>('POST', '/user/confirmEmail', { formData }),

        /**
         * @Authorized
         * Get your current affiliate/referral status.
         */
        getAffiliateStatus: async () =>
            this.request<BITMEX.Affiliate>('GET', '/user/affiliateStatus', {}, true),

        /**
         * Check if a referral code is valid.If the code is valid, responds with the referral code's discount (e.g. `0.1` for 10%). Otherwise, will return a 404.
         */
        checkReferralCode: async (qs : BITMEX.UserCheckReferralCodeQuery = {}) =>
            this.request<number>('GET', '/user/checkReferralCode', { qs }),

        /**
         * Log out of BitMEX.
         */
        logout: async () =>
            this.request<any>('POST', '/user/logout', {}),

        /**
         * @Authorized
         * Log all systems out of BitMEX.
         * This will revoke all of your account's access tokens, logging you out on all devices.
         */
        logoutAll: async () =>
            this.request<number>('POST', '/user/logoutAll', {}, true),

        /**
         * @Authorized
         * Save user preferences.
         */
        savePreferences: async (formData : BITMEX.UserPreferencesPost) =>
            this.request<BITMEX.User>('POST', '/user/preferences', { formData }, true),

        /**
         * @Authorized
         * Get your user model.
         */
        get: async () =>
            this.request<BITMEX.User>('GET', '/user', {}, true),

        /**
         * @Authorized
         * Update your password, name, and other attributes.
         */
        update: async (formData : BITMEX.UserPut = {}) =>
            this.request<BITMEX.User>('PUT', '/user', { formData }, true),

        /**
         * @Authorized
         * Get your account's commission status.
         */
        getCommission: async () =>
            this.request<BITMEX.UserCommission[]>('GET', '/user/commission', {}, true),

        /**
         * @Authorized
         * Get your account's margin status.
         * Send a currency of "all" to receive an array of all supported currencies.
         */
        getMargin: async (qs : BITMEX.UserMarginQuery = {}) =>
            this.request<BITMEX.Margin>('GET', '/user/margin', { qs }, true),
    }
}

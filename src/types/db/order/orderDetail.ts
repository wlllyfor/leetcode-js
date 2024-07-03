import { ProductDbTableType } from "@/types/db/product/product";
import { OrderTypeDbType } from "@/types/db/order/order";
import { OrderDetailOtherDbTableType } from "@/types/db/order/orderDetailOther";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import { LeaveStockTableDbType } from "@/types/db/leaveStock/leaveStock";
import { TransactionDbTableType } from "@/types/db/transaction";
import { MallProductDbType } from "@/types/db/order/mallProduct";

export type OrderDetailDbTableType = {
  uuid: string;
  id: number;
  orderId: number | null;
  productId: number | null;
  trackingNo: string | null;
  productName: string | null;
  variation: string | null;
  quantity: number;
  orderStatus: string | null;
  mall: string | null;
  mallOrderId: string | null;
  shopName: string | null;
  unitPrice: number;
  postage: number;
  publicRemarks: string;
  publicRemarksFilePath: string;
  privateRemarks: string;
  privateRemarksFilePath: string;
  receipt: string;
  receiptFilePath: string;
  createdAt: Date | null;
  updatedAt: Date | null;

  // not model (サーバからわたってくる値。フロントで計算をしていない。)
  /**
   * 小計
   */
  subTotal: number;
  /**
   * その他金額合計
   */
  otherPriceTotal: number;
  /**
   * 取引(引落)履歴
   */
  depositTransactions: TransactionDbTableType[];

  /**
   * 注文ステータスラベル
   */
  orderStatusLabel: string;

  /**
   * 引落ステータスラベル
   */
  directDebitStatusLabel: string;

  /**
   * 編集処理が可能か（キャンセル中、キャンセル済みの場合は編集が不可。）
   */
  processable: boolean;

  /**
   * 一覧に、注文ヘッダを表示してよいか
   */
  orderToShowHeader: boolean;

  /**
   * 一覧に仕入先ヘッダを表示してよいか
   */
  shopNameToShowHeader: boolean;
  createdOn: string;
  updatedOn: string;

  // リクエスト用
  privateRemarksFile: File | null;
  publicRemarksFile: File | null;
  receiptFile: File | null;

  // relation
  product: ProductDbTableType;
  order: OrderTypeDbType;
  orderDetailOthers: OrderDetailOtherDbTableType[];
  receiveStock: ReceiveStockDbTableType;
  leaveStock: LeaveStockTableDbType;
  mallProduct: MallProductDbType;
};

#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { WebApiStack } from "../lib/stack";

const app = new cdk.App();

const envConfig = {
  dev: {
    env: "dev",
    singleNatGw: true,
    auroraMinAcu: 0.5,
    auroraMaxAcu: 2,
    ecsMinTasks: 1,
    ecsMaxTasks: 2,
    useFargateSpot: true,
    logRetentionDays: 7,
    dbBackupRetention: 1,
    deletionProtection: false,
  },
  prod: {
    env: "prod",
    singleNatGw: false,
    auroraMinAcu: 1.0,
    auroraMaxAcu: 16,
    ecsMinTasks: 2,
    ecsMaxTasks: 10,
    useFargateSpot: false,
    logRetentionDays: 90,
    dbBackupRetention: 30,
    deletionProtection: true,
  },
} as const;

const targetEnv = (app.node.tryGetContext("env") ?? "dev") as "dev" | "prod";
const config = envConfig[targetEnv];

new WebApiStack(app, `WebApi-${config.env}`, {
  config,
  containerImage: app.node.tryGetContext("containerImage") ?? "public.ecr.aws/nginx/nginx:latest",
  acmCertificateArn: app.node.tryGetContext("acmCertificateArn") ?? "",
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION ?? "ap-northeast-1",
  },
});
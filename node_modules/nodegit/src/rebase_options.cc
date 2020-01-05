// This is a generated file, modify: generate/templates/templates/struct_content.cc

#include <nan.h>
#include <string.h>
#ifdef WIN32
#include <windows.h>
#else
#include <unistd.h>
#endif // win32

extern "C" {
  #include <git2.h>
 }

#include <iostream>
#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/rebase_options.h"
#include "nodegit_wrapper.cc"

  #include "../include/checkout_options.h"
  #include "../include/merge_options.h"
  #include "../include/buf.h"
 
using namespace v8;
using namespace node;
using namespace std;


// generated from struct_content.cc
GitRebaseOptions::GitRebaseOptions() : NodeGitWrapper<GitRebaseOptionsTraits>(NULL, true, v8::Local<v8::Object>())
{
        git_rebase_options wrappedValue = GIT_REBASE_OPTIONS_INIT;
      this->raw = (git_rebase_options*) malloc(sizeof(git_rebase_options));
      memcpy(this->raw, &wrappedValue, sizeof(git_rebase_options));
  
  this->ConstructFields();
}

GitRebaseOptions::GitRebaseOptions(git_rebase_options* raw, bool selfFreeing, v8::Local<v8::Object> owner)
 : NodeGitWrapper<GitRebaseOptionsTraits>(raw, selfFreeing, owner)
{
  this->ConstructFields();
}

GitRebaseOptions::~GitRebaseOptions() {
                   this->checkout_options.Reset();
             this->merge_options.Reset();
             if (this->signing_cb.HasCallback()) {
               this->raw->payload = NULL;
           }
          }

void GitRebaseOptions::ConstructFields() {
                   v8::Local<Object> checkout_optionsTemp = Nan::To<v8::Object>(GitCheckoutOptions::New(
&this->raw->checkout_options,
            false
          )).ToLocalChecked();
          this->checkout_options.Reset(checkout_optionsTemp);

             v8::Local<Object> merge_optionsTemp = Nan::To<v8::Object>(GitMergeOptions::New(
&this->raw->merge_options,
            false
          )).ToLocalChecked();
          this->merge_options.Reset(merge_optionsTemp);

   
          // Set the static method call and set the payload for this function to be
          // the current instance
          this->raw->signing_cb = NULL;
             this->raw->payload = (void *)this;
    
          v8::Local<Value> payload = Nan::Undefined();
          this->payload.Reset(payload);
       }

void GitRebaseOptions::InitializeComponent(v8::Local<v8::Object> target) {
  Nan::HandleScope scope;

  v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  tpl->SetClassName(Nan::New("RebaseOptions").ToLocalChecked());

      Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("version").ToLocalChecked(), GetVersion, SetVersion);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("quiet").ToLocalChecked(), GetQuiet, SetQuiet);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("rewriteNotesRef").ToLocalChecked(), GetRewriteNotesRef, SetRewriteNotesRef);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("checkoutOptions").ToLocalChecked(), GetCheckoutOptions, SetCheckoutOptions);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("mergeOptions").ToLocalChecked(), GetMergeOptions, SetMergeOptions);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("signingCb").ToLocalChecked(), GetSigningCb, SetSigningCb);
          Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("inmemory").ToLocalChecked(), GetInmemory, SetInmemory);
   
  InitializeTemplate(tpl);

  v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
  constructor_template.Reset(_constructor_template);
  Nan::Set(target, Nan::New("RebaseOptions").ToLocalChecked(), _constructor_template);
}

    NAN_GETTER(GitRebaseOptions::GetVersion) {

      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->version));
     }

    NAN_SETTER(GitRebaseOptions::SetVersion) {
      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->version = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitRebaseOptions::GetQuiet) {

      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->quiet));
     }

    NAN_SETTER(GitRebaseOptions::SetQuiet) {
      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->quiet = (int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitRebaseOptions::GetRewriteNotesRef) {

      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

        if (wrapper->GetValue()->rewrite_notes_ref) {
          info.GetReturnValue().Set(Nan::New<String>(wrapper->GetValue()->rewrite_notes_ref).ToLocalChecked());
        }
        else {
          return;
        }

     }

    NAN_SETTER(GitRebaseOptions::SetRewriteNotesRef) {
      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

        if (wrapper->GetValue()->rewrite_notes_ref) {
        }

        Nan::Utf8String str(value);
        wrapper->GetValue()->rewrite_notes_ref = strdup(*str);

     }

      NAN_GETTER(GitRebaseOptions::GetCheckoutOptions) {

      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->checkout_options));

     }

    NAN_SETTER(GitRebaseOptions::SetCheckoutOptions) {
      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

        v8::Local<Object> checkout_options(Nan::To<v8::Object>(value).ToLocalChecked());

        wrapper->checkout_options.Reset(checkout_options);

        wrapper->raw->checkout_options = *  Nan::ObjectWrap::Unwrap<GitCheckoutOptions>(Nan::To<v8::Object>(checkout_options).ToLocalChecked())->GetValue() ;

     }

      NAN_GETTER(GitRebaseOptions::GetMergeOptions) {

      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->merge_options));

     }

    NAN_SETTER(GitRebaseOptions::SetMergeOptions) {
      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

        v8::Local<Object> merge_options(Nan::To<v8::Object>(value).ToLocalChecked());

        wrapper->merge_options.Reset(merge_options);

        wrapper->raw->merge_options = *  Nan::ObjectWrap::Unwrap<GitMergeOptions>(Nan::To<v8::Object>(merge_options).ToLocalChecked())->GetValue() ;

     }

      NAN_GETTER(GitRebaseOptions::GetSigningCb) {

      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

        if (wrapper->signing_cb.HasCallback()) {
          info.GetReturnValue().Set(wrapper->signing_cb.GetCallback()->GetFunction());
        } else {
          info.GetReturnValue().SetUndefined();
        }

     }

    NAN_SETTER(GitRebaseOptions::SetSigningCb) {
      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

        Nan::Callback *callback = NULL;
        int throttle = 0;
        bool waitForResult = true;

        if (value->IsFunction()) {
          callback = new Nan::Callback(value.As<Function>());
        } else if (value->IsObject()) {
          v8::Local<Object> object = value.As<Object>();
          v8::Local<String> callbackKey;
          Nan::MaybeLocal<Value> maybeObjectCallback = Nan::Get(object, Nan::New("callback").ToLocalChecked());
          if (!maybeObjectCallback.IsEmpty()) {
            v8::Local<Value> objectCallback = maybeObjectCallback.ToLocalChecked();
            if (objectCallback->IsFunction()) {
              callback = new Nan::Callback(objectCallback.As<Function>());

              Nan::MaybeLocal<Value> maybeObjectThrottle = Nan::Get(object, Nan::New("throttle").ToLocalChecked());
              if(!maybeObjectThrottle.IsEmpty()) {
                v8::Local<Value> objectThrottle = maybeObjectThrottle.ToLocalChecked();
                if (objectThrottle->IsNumber()) {
                  throttle = (int)objectThrottle.As<Number>()->Value();
                }
              }

              Nan::MaybeLocal<Value> maybeObjectWaitForResult = Nan::Get(object, Nan::New("waitForResult").ToLocalChecked());
              if(!maybeObjectWaitForResult.IsEmpty()) {
                Local<Value> objectWaitForResult = maybeObjectWaitForResult.ToLocalChecked();
                waitForResult = Nan::To<bool>(objectWaitForResult).FromJust();
              }
            }
          }
        }
        if (callback) {
          if (!wrapper->raw->signing_cb) {
            wrapper->raw->signing_cb = (git_commit_signing_cb)signing_cb_cppCallback;
          }

          wrapper->signing_cb.SetCallback(callback, throttle, waitForResult);
        }

     }

      GitRebaseOptions* GitRebaseOptions::signing_cb_getInstanceFromBaton(SigningCbBaton* baton) {
           return static_cast<GitRebaseOptions*>(baton->
                 payload
  );
       }

      int GitRebaseOptions::signing_cb_cppCallback (
          git_buf * signature,           git_buf * signature_field,           const char * commit_content,           void * payload        ) {
        SigningCbBaton *baton =
          new SigningCbBaton(-30);

          baton->signature = signature;
          baton->signature_field = signature_field;
          baton->commit_content = commit_content;
          baton->payload = payload;
 
        GitRebaseOptions* instance = signing_cb_getInstanceFromBaton(baton);

           int result;

          if (instance->signing_cb.WillBeThrottled()) {
            result = baton->defaultResult;
            delete baton;
          } else if (instance->signing_cb.ShouldWaitForResult()) {
            result = baton->ExecuteAsync(signing_cb_async);
            delete baton;
          } else {
            result = baton->defaultResult;
            baton->ExecuteAsync(signing_cb_async, deleteBaton);
          }
          return result;
       }


      void GitRebaseOptions::signing_cb_async(void *untypedBaton) {
        Nan::HandleScope scope;

        SigningCbBaton* baton = static_cast<SigningCbBaton*>(untypedBaton);
        GitRebaseOptions* instance = signing_cb_getInstanceFromBaton(baton);

        if (instance->signing_cb.GetCallback()->IsEmpty()) {
            baton->result = baton->defaultResult; // no results acquired
           baton->Done();
          return;
        }

           v8::Local<Value> argv[3] = {
               GitBuf::New(baton->signature, false)
 ,               GitBuf::New(baton->signature_field, false)
 ,               baton->commit_content == NULL
                ? Nan::EmptyString()
                : Nan::New( baton->commit_content).ToLocalChecked()
            };
 
        Nan::TryCatch tryCatch;

        // TODO This should take an async_resource, but we will need to figure out how to pipe the correct context into this
        Nan::MaybeLocal<v8::Value> maybeResult = Nan::Call(*(instance->signing_cb.GetCallback()), 3, argv);
        v8::Local<v8::Value> result;
        if (!maybeResult.IsEmpty()) {
          result = maybeResult.ToLocalChecked();
        }

        if(PromiseCompletion::ForwardIfPromise(result, baton, GitRebaseOptions::signing_cb_promiseCompleted)) {
          return;
        }

             if (result.IsEmpty() || result->IsNativeError()) {
              baton->result = -1;
            }
            else if (!result->IsNull() && !result->IsUndefined()) {
               if (result->IsNumber()) {
                baton->result = Nan::To<int>(result).FromJust();
              }
              else {
                baton->result = baton->defaultResult;
              }
             }
            else {
              baton->result = baton->defaultResult;
            }
           baton->Done();
       }

      void GitRebaseOptions::signing_cb_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result) {
        Nan::HandleScope scope;

        SigningCbBaton* baton = static_cast<SigningCbBaton*>(_baton);
           if (isFulfilled) {
              if (result.IsEmpty() || result->IsNativeError()) {
                baton->result = -1;
              }
              else if (!result->IsNull() && !result->IsUndefined()) {
                 if (result->IsNumber()) {
                  baton->result = Nan::To<int>(result).FromJust();
                }
                else{
                  baton->result = baton->defaultResult;
                }
               }
              else {
                baton->result = baton->defaultResult;
              }
           }
          else {
            // promise was rejected
               GitRebaseOptions* instance = static_cast<GitRebaseOptions*>(baton->   payload  );
             v8::Local<v8::Object> parent = instance->handle();
            SetPrivate(parent, Nan::New("NodeGitPromiseError").ToLocalChecked(), result);

            baton->result = -1;
          }
          baton->Done();
       }
      NAN_GETTER(GitRebaseOptions::GetPayload) {

      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->payload));

     }

    NAN_SETTER(GitRebaseOptions::SetPayload) {
      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

        wrapper->payload.Reset(value);

     }

      NAN_GETTER(GitRebaseOptions::GetInmemory) {

      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->inmemory));
     }

    NAN_SETTER(GitRebaseOptions::SetInmemory) {
      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->inmemory = (int) Nan::To<int32_t>(value).FromJust();
        }
     }

   
// force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitRebaseOptionsTraits>;

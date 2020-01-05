// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/repository.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

  #include "git2/sys/repository.h"
  #include "../include/submodule.h"
  #include "../include/remote.h"
  #include "../include/config.h"
  #include "../include/buf.h"
  #include "../include/oid.h"
  #include "../include/reference.h"
  #include "../include/index.h"
  #include "../include/repository_init_options.h"
  #include "../include/odb.h"
  #include "../include/worktree.h"
  #include "../include/refdb.h"
  #include "../include/annotated_commit.h"
 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitRepository::~GitRepository() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
                                                                                                                                                                                           }

  void GitRepository::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("Repository").ToLocalChecked());

          Nan::SetPrototypeMethod(tpl, "commondir", Commondir);
            Nan::SetPrototypeMethod(tpl, "config", Config);
            Nan::SetPrototypeMethod(tpl, "detachHead", DetachHead);
             Nan::SetMethod(tpl, "discover", Discover);
            Nan::SetPrototypeMethod(tpl, "fetchheadForeach", FetchheadForeach);
            Nan::SetPrototypeMethod(tpl, "getNamespace", GetNamespace);
            Nan::SetPrototypeMethod(tpl, "head", Head);
            Nan::SetPrototypeMethod(tpl, "headDetached", HeadDetached);
            Nan::SetPrototypeMethod(tpl, "headDetachedForWorktree", HeadDetachedForWorktree);
            Nan::SetPrototypeMethod(tpl, "headForWorktree", HeadForWorktree);
            Nan::SetPrototypeMethod(tpl, "headUnborn", HeadUnborn);
            Nan::SetPrototypeMethod(tpl, "ident", Ident);
            Nan::SetPrototypeMethod(tpl, "index", Index);
             Nan::SetMethod(tpl, "init", Init);
             Nan::SetMethod(tpl, "initExt", InitExt);
            Nan::SetPrototypeMethod(tpl, "isBare", IsBare);
            Nan::SetPrototypeMethod(tpl, "isEmpty", IsEmpty);
            Nan::SetPrototypeMethod(tpl, "isShallow", IsShallow);
            Nan::SetPrototypeMethod(tpl, "isWorktree", IsWorktree);
            Nan::SetPrototypeMethod(tpl, "itemPath", ItemPath);
            Nan::SetPrototypeMethod(tpl, "mergeheadForeach", MergeheadForeach);
            Nan::SetPrototypeMethod(tpl, "messageRemove", MessageRemove);
            Nan::SetPrototypeMethod(tpl, "odb", Odb);
             Nan::SetMethod(tpl, "open", Open);
             Nan::SetMethod(tpl, "openBare", OpenBare);
             Nan::SetMethod(tpl, "openExt", OpenExt);
             Nan::SetMethod(tpl, "openFromWorktree", OpenFromWorktree);
            Nan::SetPrototypeMethod(tpl, "path", Path);
            Nan::SetPrototypeMethod(tpl, "refdb", Refdb);
            Nan::SetPrototypeMethod(tpl, "setHead", SetHead);
            Nan::SetPrototypeMethod(tpl, "setHeadDetached", SetHeadDetached);
            Nan::SetPrototypeMethod(tpl, "setHeadDetachedFromAnnotated", SetHeadDetachedFromAnnotated);
            Nan::SetPrototypeMethod(tpl, "setIdent", SetIdent);
            Nan::SetPrototypeMethod(tpl, "setNamespace", SetNamespace);
            Nan::SetPrototypeMethod(tpl, "setWorkdir", SetWorkdir);
            Nan::SetPrototypeMethod(tpl, "state", State);
            Nan::SetPrototypeMethod(tpl, "stateCleanup", StateCleanup);
            Nan::SetPrototypeMethod(tpl, "workdir", Workdir);
             Nan::SetMethod(tpl, "wrapOdb", WrapOdb);
            Nan::SetPrototypeMethod(tpl, "cleanup", Cleanup);
            Nan::SetPrototypeMethod(tpl, "getReferences", GetReferences);
            Nan::SetPrototypeMethod(tpl, "getSubmodules", GetSubmodules);
            Nan::SetPrototypeMethod(tpl, "getRemotes", GetRemotes);
            Nan::SetPrototypeMethod(tpl, "refreshReferences", RefreshReferences);
            Nan::SetPrototypeMethod(tpl, "setIndex", SetIndex);
            Nan::SetPrototypeMethod(tpl, "submoduleCacheAll", SubmoduleCacheAll);
            Nan::SetPrototypeMethod(tpl, "submoduleCacheClear", SubmoduleCacheClear);
    
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("Repository").ToLocalChecked(), _constructor_template);
  }

  
/*
     * @return String  result    */
NAN_METHOD(GitRepository::Commondir) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

 const char * result =     git_repository_commondir(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

        // null checks on pointers
        if (!result) {
          return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
        }

      v8::Local<v8::Value> to;
// start convert_to_v8 block
  if (result){
       to = Nan::New<v8::String>(result).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
  
/*
     * @param Config callback
   */
NAN_METHOD(GitRepository::Config) {

  if (info.Length() == 0 || !info[0]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  ConfigBaton* baton = new ConfigBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;

        baton->repo = Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue();

  Nan::Callback *callback = new Nan::Callback(v8::Local<Function>::Cast(info[0]));
  ConfigWorker *worker = new ConfigWorker(baton, callback);

        worker->SaveToPersistent("repo", info.This());

  AsyncLibgit2QueueWorker(worker);
  return;
}

void GitRepository::ConfigWorker::Execute() {
  git_error_clear();

  {
    LockMaster lockMaster(
      /*asyncAction: */true
            ,baton->repo
    );

    int result = git_repository_config(
&baton->out,baton->repo  );

      baton->error_code = result;

      if (result != GIT_OK && git_error_last() != NULL) {
        baton->error = git_error_dup(git_error_last());
      }

  }
}

void GitRepository::ConfigWorker::HandleOKCallback() {
    if (baton->error_code == GIT_OK) {
    v8::Local<v8::Value> to;
// start convert_to_v8 block
    if (baton->out != NULL) {
      v8::Local<v8::Array> owners = Nan::New<Array>(0);
            Nan::Set(owners, Nan::New<v8::Number>(owners->Length()), Nan::To<v8::Object>(this->GetFromPersistent("repo")).ToLocalChecked());
             to = GitConfig::New(
        baton->out,
        true
          , owners
       );
   }
  else {
    to = Nan::Null();
  }
  // end convert_to_v8 block
      v8::Local<v8::Value> result = to;

    v8::Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  } else {
    if (baton->error) {
      v8::Local<v8::Object> err;
      if (baton->error->message) {
        err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
      } else {
        err = Nan::To<v8::Object>(Nan::Error("Method config has thrown an error.")).ToLocalChecked();
      }
      Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.config").ToLocalChecked());
      v8::Local<v8::Value> argv[1] = {
        err
      };
      callback->Call(1, argv, async_resource);
      if (baton->error->message)
        free((void *)baton->error->message);
      free((void *)baton->error);
    } else if (baton->error_code < 0) {
      std::queue< v8::Local<v8::Value> > workerArguments;
      bool callbackFired = false;
      while(!workerArguments.empty()) {
        v8::Local<v8::Value> node = workerArguments.front();
        workerArguments.pop();

        if (
          !node->IsObject()
          || node->IsArray()
          || node->IsBooleanObject()
          || node->IsDate()
          || node->IsFunction()
          || node->IsNumberObject()
          || node->IsRegExp()
          || node->IsStringObject()
        ) {
          continue;
        }

        v8::Local<v8::Object> nodeObj = Nan::To<v8::Object>(node).ToLocalChecked();
        v8::Local<v8::Value> checkValue = GetPrivate(nodeObj, Nan::New("NodeGitPromiseError").ToLocalChecked());

        if (!checkValue.IsEmpty() && !checkValue->IsNull() && !checkValue->IsUndefined()) {
          v8::Local<v8::Value> argv[1] = {
            Nan::To<v8::Object>(checkValue).ToLocalChecked()
          };
          callback->Call(1, argv, async_resource);
          callbackFired = true;
          break;
        }

        v8::Local<v8::Array> properties = Nan::GetPropertyNames(nodeObj).ToLocalChecked();
        for (unsigned int propIndex = 0; propIndex < properties->Length(); ++propIndex) {
          v8::Local<v8::String> propName = Nan::To<v8::String>(Nan::Get(properties, propIndex).ToLocalChecked()).ToLocalChecked();
          v8::Local<v8::Value> nodeToQueue = Nan::Get(nodeObj, propName).ToLocalChecked();
          if (!nodeToQueue->IsUndefined()) {
            workerArguments.push(nodeToQueue);
          }
        }
      }

      if (!callbackFired) {
        v8::Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Method config has thrown an error.")).ToLocalChecked();
        Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
        Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.config").ToLocalChecked());
        v8::Local<v8::Value> argv[1] = {
          err
        };
        callback->Call(1, argv, async_resource);
      }
    } else {
      callback->Call(0, NULL, async_resource);
    }

  }


  delete baton;
}

   
/*
     * @return Number  result    */
NAN_METHOD(GitRepository::DetachHead) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

 int result =     git_repository_detach_head(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
  
/*
  * @param String start_path
   * @param Number across_fs
   * @param String ceiling_dirs
    * @param Buf callback
   */
NAN_METHOD(GitRepository::Discover) {

  if (info.Length() == 0 || !info[0]->IsString()) {
    return Nan::ThrowError("String start_path is required.");
  }

  if (info.Length() == 1 || !info[1]->IsNumber()) {
    return Nan::ThrowError("Number across_fs is required.");
  }

  if (info.Length() == 3 || !info[3]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  DiscoverBaton* baton = new DiscoverBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;

      baton->out = (git_buf *)malloc(sizeof(git_buf ));
        baton->out->ptr = NULL;
        baton->out->size = baton->out->asize = 0;
// start convert_from_v8 block
  const char * from_start_path = NULL;

  Nan::Utf8String start_path(Nan::To<v8::String>(info[0]).ToLocalChecked());
  // malloc with one extra byte so we can add the terminating null character C-strings expect:
  from_start_path = (const char *) malloc(start_path.length() + 1);
  // copy the characters from the nodejs string into our C-string (used instead of strdup or strcpy because nulls in
  // the middle of strings are valid coming from nodejs):
  memcpy((void *)from_start_path, *start_path, start_path.length());
  // ensure the final byte of our new string is null, extra casts added to ensure compatibility with various C types
  // used in the nodejs binding generation:
  memset((void *)(((char *)from_start_path) + start_path.length()), 0, 1);
// end convert_from_v8 block
          baton->start_path = from_start_path;
// start convert_from_v8 block
  int from_across_fs;
      from_across_fs = (int)   info[1].As<v8::Number>()->Value();
// end convert_from_v8 block
          baton->across_fs = from_across_fs;
// start convert_from_v8 block
  const char * from_ceiling_dirs = NULL;
    if (info[2]->IsString()) {

  Nan::Utf8String ceiling_dirs(Nan::To<v8::String>(info[2]).ToLocalChecked());
  // malloc with one extra byte so we can add the terminating null character C-strings expect:
  from_ceiling_dirs = (const char *) malloc(ceiling_dirs.length() + 1);
  // copy the characters from the nodejs string into our C-string (used instead of strdup or strcpy because nulls in
  // the middle of strings are valid coming from nodejs):
  memcpy((void *)from_ceiling_dirs, *ceiling_dirs, ceiling_dirs.length());
  // ensure the final byte of our new string is null, extra casts added to ensure compatibility with various C types
  // used in the nodejs binding generation:
  memset((void *)(((char *)from_ceiling_dirs) + ceiling_dirs.length()), 0, 1);
  }
  else {
    from_ceiling_dirs = 0;
  }
// end convert_from_v8 block
          baton->ceiling_dirs = from_ceiling_dirs;

  Nan::Callback *callback = new Nan::Callback(v8::Local<Function>::Cast(info[3]));
  DiscoverWorker *worker = new DiscoverWorker(baton, callback);

        if (!info[0]->IsUndefined() && !info[0]->IsNull())
          worker->SaveToPersistent("start_path", Nan::To<v8::Object>(info[0]).ToLocalChecked());
        if (!info[1]->IsUndefined() && !info[1]->IsNull())
          worker->SaveToPersistent("across_fs", Nan::To<v8::Object>(info[1]).ToLocalChecked());
        if (!info[2]->IsUndefined() && !info[2]->IsNull())
          worker->SaveToPersistent("ceiling_dirs", Nan::To<v8::Object>(info[2]).ToLocalChecked());

  AsyncLibgit2QueueWorker(worker);
  return;
}

void GitRepository::DiscoverWorker::Execute() {
  git_error_clear();

  {
    LockMaster lockMaster(
      /*asyncAction: */true
            ,baton->out
            ,baton->start_path
            ,baton->ceiling_dirs
    );

    int result = git_repository_discover(
baton->out,baton->start_path,baton->across_fs,baton->ceiling_dirs  );

      baton->error_code = result;

      if (result != GIT_OK && git_error_last() != NULL) {
        baton->error = git_error_dup(git_error_last());
      }

  }
}

void GitRepository::DiscoverWorker::HandleOKCallback() {
    if (baton->error_code == GIT_OK) {
    v8::Local<v8::Value> to;
// start convert_to_v8 block
   if (baton->out) {
    to = Nan::New<v8::String>(baton->out->ptr, baton->out->size).ToLocalChecked();
  }
  else {
    to = Nan::Null();
  }
  // end convert_to_v8 block
      v8::Local<v8::Value> result = to;

    v8::Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  } else {
    if (baton->error) {
      v8::Local<v8::Object> err;
      if (baton->error->message) {
        err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
      } else {
        err = Nan::To<v8::Object>(Nan::Error("Method discover has thrown an error.")).ToLocalChecked();
      }
      Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.discover").ToLocalChecked());
      v8::Local<v8::Value> argv[1] = {
        err
      };
      callback->Call(1, argv, async_resource);
      if (baton->error->message)
        free((void *)baton->error->message);
      free((void *)baton->error);
    } else if (baton->error_code < 0) {
      std::queue< v8::Local<v8::Value> > workerArguments;
              workerArguments.push(GetFromPersistent("start_path"));
              workerArguments.push(GetFromPersistent("across_fs"));
              workerArguments.push(GetFromPersistent("ceiling_dirs"));
      bool callbackFired = false;
      while(!workerArguments.empty()) {
        v8::Local<v8::Value> node = workerArguments.front();
        workerArguments.pop();

        if (
          !node->IsObject()
          || node->IsArray()
          || node->IsBooleanObject()
          || node->IsDate()
          || node->IsFunction()
          || node->IsNumberObject()
          || node->IsRegExp()
          || node->IsStringObject()
        ) {
          continue;
        }

        v8::Local<v8::Object> nodeObj = Nan::To<v8::Object>(node).ToLocalChecked();
        v8::Local<v8::Value> checkValue = GetPrivate(nodeObj, Nan::New("NodeGitPromiseError").ToLocalChecked());

        if (!checkValue.IsEmpty() && !checkValue->IsNull() && !checkValue->IsUndefined()) {
          v8::Local<v8::Value> argv[1] = {
            Nan::To<v8::Object>(checkValue).ToLocalChecked()
          };
          callback->Call(1, argv, async_resource);
          callbackFired = true;
          break;
        }

        v8::Local<v8::Array> properties = Nan::GetPropertyNames(nodeObj).ToLocalChecked();
        for (unsigned int propIndex = 0; propIndex < properties->Length(); ++propIndex) {
          v8::Local<v8::String> propName = Nan::To<v8::String>(Nan::Get(properties, propIndex).ToLocalChecked()).ToLocalChecked();
          v8::Local<v8::Value> nodeToQueue = Nan::Get(nodeObj, propName).ToLocalChecked();
          if (!nodeToQueue->IsUndefined()) {
            workerArguments.push(nodeToQueue);
          }
        }
      }

      if (!callbackFired) {
        v8::Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Method discover has thrown an error.")).ToLocalChecked();
        Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
        Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.discover").ToLocalChecked());
        v8::Local<v8::Value> argv[1] = {
          err
        };
        callback->Call(1, argv, async_resource);
      }
    } else {
      callback->Call(0, NULL, async_resource);
    }

  }

        git_buf_dispose(baton->out);
        free((void *)baton->out);

  delete baton;
}

  
/*
   * @param RepositoryFetchheadForeachCb callback
   * @param Void payload
     */
NAN_METHOD(GitRepository::FetchheadForeach) {

  if (info.Length() == 0 || !info[0]->IsFunction()) {
    return Nan::ThrowError("RepositoryFetchheadForeachCb callback is required.");
  }
  if (info.Length() == 2 || !info[2]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  FetchheadForeachBaton* baton = new FetchheadForeachBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;

      FetchheadForeach_globalPayload* globalPayload = new FetchheadForeach_globalPayload;
        baton->repo = Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue();
        if (!info[0]->IsFunction()) {
          baton->callback = NULL;
          globalPayload->callback = NULL;
        }
        else {
          baton->callback = FetchheadForeach_callback_cppCallback;
            globalPayload->callback = new Nan::Callback(info[0].As<Function>());
        }
          baton->payload = globalPayload;

  Nan::Callback *callback = new Nan::Callback(v8::Local<Function>::Cast(info[2]));
  FetchheadForeachWorker *worker = new FetchheadForeachWorker(baton, callback);

        worker->SaveToPersistent("repo", info.This());
        if (!info[1]->IsUndefined() && !info[1]->IsNull())
          worker->SaveToPersistent("payload", Nan::To<v8::Object>(info[1]).ToLocalChecked());

  AsyncLibgit2QueueWorker(worker);
  return;
}

void GitRepository::FetchheadForeachWorker::Execute() {
  git_error_clear();

  {
    LockMaster lockMaster(
      /*asyncAction: */true
            ,baton->repo
            ,baton->payload
    );

    int result = git_repository_fetchhead_foreach(
baton->repo,baton->callback,baton->payload  );

      baton->error_code = result;

      if (result != GIT_OK && git_error_last() != NULL) {
        baton->error = git_error_dup(git_error_last());
      }

  }
}

void GitRepository::FetchheadForeachWorker::HandleOKCallback() {
    if (baton->error_code == GIT_OK) {
    v8::Local<v8::Value> result = Nan::Undefined();

    v8::Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  } else {
    if (baton->error) {
      v8::Local<v8::Object> err;
      if (baton->error->message) {
        err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
      } else {
        err = Nan::To<v8::Object>(Nan::Error("Method fetchheadForeach has thrown an error.")).ToLocalChecked();
      }
      Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.fetchheadForeach").ToLocalChecked());
      v8::Local<v8::Value> argv[1] = {
        err
      };
      callback->Call(1, argv, async_resource);
      if (baton->error->message)
        free((void *)baton->error->message);
      free((void *)baton->error);
    } else if (baton->error_code < 0) {
      std::queue< v8::Local<v8::Value> > workerArguments;
              workerArguments.push(GetFromPersistent("payload"));
      bool callbackFired = false;
      while(!workerArguments.empty()) {
        v8::Local<v8::Value> node = workerArguments.front();
        workerArguments.pop();

        if (
          !node->IsObject()
          || node->IsArray()
          || node->IsBooleanObject()
          || node->IsDate()
          || node->IsFunction()
          || node->IsNumberObject()
          || node->IsRegExp()
          || node->IsStringObject()
        ) {
          continue;
        }

        v8::Local<v8::Object> nodeObj = Nan::To<v8::Object>(node).ToLocalChecked();
        v8::Local<v8::Value> checkValue = GetPrivate(nodeObj, Nan::New("NodeGitPromiseError").ToLocalChecked());

        if (!checkValue.IsEmpty() && !checkValue->IsNull() && !checkValue->IsUndefined()) {
          v8::Local<v8::Value> argv[1] = {
            Nan::To<v8::Object>(checkValue).ToLocalChecked()
          };
          callback->Call(1, argv, async_resource);
          callbackFired = true;
          break;
        }

        v8::Local<v8::Array> properties = Nan::GetPropertyNames(nodeObj).ToLocalChecked();
        for (unsigned int propIndex = 0; propIndex < properties->Length(); ++propIndex) {
          v8::Local<v8::String> propName = Nan::To<v8::String>(Nan::Get(properties, propIndex).ToLocalChecked()).ToLocalChecked();
          v8::Local<v8::Value> nodeToQueue = Nan::Get(nodeObj, propName).ToLocalChecked();
          if (!nodeToQueue->IsUndefined()) {
            workerArguments.push(nodeToQueue);
          }
        }
      }

      if (!callbackFired) {
        v8::Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Method fetchheadForeach has thrown an error.")).ToLocalChecked();
        Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
        Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.fetchheadForeach").ToLocalChecked());
        v8::Local<v8::Value> argv[1] = {
          err
        };
        callback->Call(1, argv, async_resource);
      }
    } else {
      callback->Call(0, NULL, async_resource);
    }

  }

      delete (FetchheadForeach_globalPayload*)baton->payload;

  delete baton;
}


int GitRepository::FetchheadForeach_callback_cppCallback (
    const char * refname,     const char * remote_url,     const git_oid * oid,     unsigned int is_merge,     void * payload  ) {
  FetchheadForeach_CallbackBaton baton(0);

    baton.refname = refname;
    baton.remote_url = remote_url;
    baton.oid = oid;
    baton.is_merge = is_merge;
    baton.payload = payload;
 
  return baton.ExecuteAsync(FetchheadForeach_callback_async);
}

void GitRepository::FetchheadForeach_callback_async(void *untypedBaton) {
  Nan::HandleScope scope;

  FetchheadForeach_CallbackBaton* baton = static_cast<FetchheadForeach_CallbackBaton*>(untypedBaton);

      Nan::Callback* callback = ((FetchheadForeach_globalPayload*)baton->payload)->callback;
   
  v8::Local<Value> argv[4] = {
         Nan::New(baton->refname).ToLocalChecked()
 ,          Nan::New(baton->remote_url).ToLocalChecked()
 ,          GitOid::New(baton->oid, false)
 ,           Nan::New(baton->is_merge)
    };

  Nan::TryCatch tryCatch;
  // TODO This should take an async_resource, but we will need to figure out how to pipe the correct context into this
  Nan::MaybeLocal<v8::Value> maybeResult = Nan::Call(*callback, 4, argv);
  v8::Local<v8::Value> result;
  if (!maybeResult.IsEmpty()) {
    result = maybeResult.ToLocalChecked();
  }

  if(PromiseCompletion::ForwardIfPromise(result, baton, FetchheadForeach_callback_promiseCompleted)) {
    return;
  }

    if (result.IsEmpty() || result->IsNativeError()) {
      baton->result = 1;
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

void GitRepository::FetchheadForeach_callback_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result) {
  Nan::HandleScope scope;

  FetchheadForeach_CallbackBaton* baton = static_cast<FetchheadForeach_CallbackBaton*>(_baton);

  if (isFulfilled) {
      if (result.IsEmpty() || result->IsNativeError()) {
        baton->result = 1;
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
   }
  else {
    // promise was rejected
    GitRepository* instance = static_cast<GitRepository*>(baton->    payload  );
    v8::Local<v8::Object> parent = instance->handle();
    SetPrivate(parent, Nan::New("NodeGitPromiseError").ToLocalChecked(), result);

    baton->result = 1;
  }
  baton->Done();
}
   
/*
     * @return String  result    */
NAN_METHOD(GitRepository::GetNamespace) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

 const char * result =     git_repository_get_namespace(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

        // null checks on pointers
        if (!result) {
          return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
        }

      v8::Local<v8::Value> to;
// start convert_to_v8 block
  if (result){
       to = Nan::New<v8::String>(result).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
  
/*
     * @param Reference callback
   */
NAN_METHOD(GitRepository::Head) {

  if (info.Length() == 0 || !info[0]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  HeadBaton* baton = new HeadBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;

        baton->repo = Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue();

  Nan::Callback *callback = new Nan::Callback(v8::Local<Function>::Cast(info[0]));
  HeadWorker *worker = new HeadWorker(baton, callback);

        worker->SaveToPersistent("repo", info.This());

  AsyncLibgit2QueueWorker(worker);
  return;
}

void GitRepository::HeadWorker::Execute() {
  git_error_clear();

  {
    LockMaster lockMaster(
      /*asyncAction: */true
            ,baton->repo
    );

    int result = git_repository_head(
&baton->out,baton->repo  );

      baton->error_code = result;

      if (result != GIT_OK && git_error_last() != NULL) {
        baton->error = git_error_dup(git_error_last());
      }

  }
}

void GitRepository::HeadWorker::HandleOKCallback() {
    if (baton->error_code == GIT_OK) {
    v8::Local<v8::Value> to;
// start convert_to_v8 block
    if (baton->out != NULL) {
      v8::Local<v8::Array> owners = Nan::New<Array>(0);
          Nan::Set(
          owners,
          Nan::New<v8::Number>(owners->Length()),
          Nan::To<v8::Object>(GitRepository::New(
            git_reference_owner(baton->out),
            true
          )).ToLocalChecked()
        );
         to = GitRefs::New(
        baton->out,
        true
          , owners
       );
   }
  else {
    to = Nan::Null();
  }
  // end convert_to_v8 block
      v8::Local<v8::Value> result = to;

    v8::Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  } else {
    if (baton->error) {
      v8::Local<v8::Object> err;
      if (baton->error->message) {
        err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
      } else {
        err = Nan::To<v8::Object>(Nan::Error("Method head has thrown an error.")).ToLocalChecked();
      }
      Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.head").ToLocalChecked());
      v8::Local<v8::Value> argv[1] = {
        err
      };
      callback->Call(1, argv, async_resource);
      if (baton->error->message)
        free((void *)baton->error->message);
      free((void *)baton->error);
    } else if (baton->error_code < 0) {
      std::queue< v8::Local<v8::Value> > workerArguments;
      bool callbackFired = false;
      while(!workerArguments.empty()) {
        v8::Local<v8::Value> node = workerArguments.front();
        workerArguments.pop();

        if (
          !node->IsObject()
          || node->IsArray()
          || node->IsBooleanObject()
          || node->IsDate()
          || node->IsFunction()
          || node->IsNumberObject()
          || node->IsRegExp()
          || node->IsStringObject()
        ) {
          continue;
        }

        v8::Local<v8::Object> nodeObj = Nan::To<v8::Object>(node).ToLocalChecked();
        v8::Local<v8::Value> checkValue = GetPrivate(nodeObj, Nan::New("NodeGitPromiseError").ToLocalChecked());

        if (!checkValue.IsEmpty() && !checkValue->IsNull() && !checkValue->IsUndefined()) {
          v8::Local<v8::Value> argv[1] = {
            Nan::To<v8::Object>(checkValue).ToLocalChecked()
          };
          callback->Call(1, argv, async_resource);
          callbackFired = true;
          break;
        }

        v8::Local<v8::Array> properties = Nan::GetPropertyNames(nodeObj).ToLocalChecked();
        for (unsigned int propIndex = 0; propIndex < properties->Length(); ++propIndex) {
          v8::Local<v8::String> propName = Nan::To<v8::String>(Nan::Get(properties, propIndex).ToLocalChecked()).ToLocalChecked();
          v8::Local<v8::Value> nodeToQueue = Nan::Get(nodeObj, propName).ToLocalChecked();
          if (!nodeToQueue->IsUndefined()) {
            workerArguments.push(nodeToQueue);
          }
        }
      }

      if (!callbackFired) {
        v8::Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Method head has thrown an error.")).ToLocalChecked();
        Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
        Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.head").ToLocalChecked());
        v8::Local<v8::Value> argv[1] = {
          err
        };
        callback->Call(1, argv, async_resource);
      }
    } else {
      callback->Call(0, NULL, async_resource);
    }

  }


  delete baton;
}

   
/*
     * @return Number  result    */
NAN_METHOD(GitRepository::HeadDetached) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

 int result =     git_repository_head_detached(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
   * @param String name
     * @return Number  result    */
NAN_METHOD(GitRepository::HeadDetachedForWorktree) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0 || !info[0]->IsString()) {
    return Nan::ThrowError("String name is required.");
  }

// start convert_from_v8 block
  const char * from_name = NULL;

  Nan::Utf8String name(Nan::To<v8::String>(info[0]).ToLocalChecked());
  // malloc with one extra byte so we can add the terminating null character C-strings expect:
  from_name = (const char *) malloc(name.length() + 1);
  // copy the characters from the nodejs string into our C-string (used instead of strdup or strcpy because nulls in
  // the middle of strings are valid coming from nodejs):
  memcpy((void *)from_name, *name, name.length());
  // ensure the final byte of our new string is null, extra casts added to ensure compatibility with various C types
  // used in the nodejs binding generation:
  memset((void *)(((char *)from_name) + name.length()), 0, 1);
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
            ,
              from_name
    );

 int result =     git_repository_head_detached_for_worktree(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
,          from_name
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
  
/*
    * @param String name
    * @param Reference callback
   */
NAN_METHOD(GitRepository::HeadForWorktree) {

  if (info.Length() == 0 || !info[0]->IsString()) {
    return Nan::ThrowError("String name is required.");
  }

  if (info.Length() == 1 || !info[1]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  HeadForWorktreeBaton* baton = new HeadForWorktreeBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;

        baton->repo = Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue();
// start convert_from_v8 block
  const char * from_name = NULL;

  Nan::Utf8String name(Nan::To<v8::String>(info[0]).ToLocalChecked());
  // malloc with one extra byte so we can add the terminating null character C-strings expect:
  from_name = (const char *) malloc(name.length() + 1);
  // copy the characters from the nodejs string into our C-string (used instead of strdup or strcpy because nulls in
  // the middle of strings are valid coming from nodejs):
  memcpy((void *)from_name, *name, name.length());
  // ensure the final byte of our new string is null, extra casts added to ensure compatibility with various C types
  // used in the nodejs binding generation:
  memset((void *)(((char *)from_name) + name.length()), 0, 1);
// end convert_from_v8 block
          baton->name = from_name;

  Nan::Callback *callback = new Nan::Callback(v8::Local<Function>::Cast(info[1]));
  HeadForWorktreeWorker *worker = new HeadForWorktreeWorker(baton, callback);

        worker->SaveToPersistent("repo", info.This());
        if (!info[0]->IsUndefined() && !info[0]->IsNull())
          worker->SaveToPersistent("name", Nan::To<v8::Object>(info[0]).ToLocalChecked());

  AsyncLibgit2QueueWorker(worker);
  return;
}

void GitRepository::HeadForWorktreeWorker::Execute() {
  git_error_clear();

  {
    LockMaster lockMaster(
      /*asyncAction: */true
            ,baton->repo
            ,baton->name
    );

    int result = git_repository_head_for_worktree(
&baton->out,baton->repo,baton->name  );

      baton->error_code = result;

      if (result != GIT_OK && git_error_last() != NULL) {
        baton->error = git_error_dup(git_error_last());
      }

  }
}

void GitRepository::HeadForWorktreeWorker::HandleOKCallback() {
    if (baton->error_code == GIT_OK) {
    v8::Local<v8::Value> to;
// start convert_to_v8 block
    if (baton->out != NULL) {
      v8::Local<v8::Array> owners = Nan::New<Array>(0);
          Nan::Set(
          owners,
          Nan::New<v8::Number>(owners->Length()),
          Nan::To<v8::Object>(GitRepository::New(
            git_reference_owner(baton->out),
            true
          )).ToLocalChecked()
        );
         to = GitRefs::New(
        baton->out,
        true
          , owners
       );
   }
  else {
    to = Nan::Null();
  }
  // end convert_to_v8 block
      v8::Local<v8::Value> result = to;

    v8::Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  } else {
    if (baton->error) {
      v8::Local<v8::Object> err;
      if (baton->error->message) {
        err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
      } else {
        err = Nan::To<v8::Object>(Nan::Error("Method headForWorktree has thrown an error.")).ToLocalChecked();
      }
      Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.headForWorktree").ToLocalChecked());
      v8::Local<v8::Value> argv[1] = {
        err
      };
      callback->Call(1, argv, async_resource);
      if (baton->error->message)
        free((void *)baton->error->message);
      free((void *)baton->error);
    } else if (baton->error_code < 0) {
      std::queue< v8::Local<v8::Value> > workerArguments;
              workerArguments.push(GetFromPersistent("name"));
      bool callbackFired = false;
      while(!workerArguments.empty()) {
        v8::Local<v8::Value> node = workerArguments.front();
        workerArguments.pop();

        if (
          !node->IsObject()
          || node->IsArray()
          || node->IsBooleanObject()
          || node->IsDate()
          || node->IsFunction()
          || node->IsNumberObject()
          || node->IsRegExp()
          || node->IsStringObject()
        ) {
          continue;
        }

        v8::Local<v8::Object> nodeObj = Nan::To<v8::Object>(node).ToLocalChecked();
        v8::Local<v8::Value> checkValue = GetPrivate(nodeObj, Nan::New("NodeGitPromiseError").ToLocalChecked());

        if (!checkValue.IsEmpty() && !checkValue->IsNull() && !checkValue->IsUndefined()) {
          v8::Local<v8::Value> argv[1] = {
            Nan::To<v8::Object>(checkValue).ToLocalChecked()
          };
          callback->Call(1, argv, async_resource);
          callbackFired = true;
          break;
        }

        v8::Local<v8::Array> properties = Nan::GetPropertyNames(nodeObj).ToLocalChecked();
        for (unsigned int propIndex = 0; propIndex < properties->Length(); ++propIndex) {
          v8::Local<v8::String> propName = Nan::To<v8::String>(Nan::Get(properties, propIndex).ToLocalChecked()).ToLocalChecked();
          v8::Local<v8::Value> nodeToQueue = Nan::Get(nodeObj, propName).ToLocalChecked();
          if (!nodeToQueue->IsUndefined()) {
            workerArguments.push(nodeToQueue);
          }
        }
      }

      if (!callbackFired) {
        v8::Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Method headForWorktree has thrown an error.")).ToLocalChecked();
        Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
        Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.headForWorktree").ToLocalChecked());
        v8::Local<v8::Value> argv[1] = {
          err
        };
        callback->Call(1, argv, async_resource);
      }
    } else {
      callback->Call(0, NULL, async_resource);
    }

  }


  delete baton;
}

   
/*
     * @return Number  result    */
NAN_METHOD(GitRepository::HeadUnborn) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

 int result =     git_repository_head_unborn(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
       * @return String name    * @return String email    */
NAN_METHOD(GitRepository::Ident) {
  Nan::EscapableHandleScope scope;

      const char * name = 0;
      const char * email = 0;

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

 int result =     git_repository_ident(
&          name
,&          email
,          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );


      v8::Local<v8::Value> to;
        v8::Local<Object> toReturn = Nan::New<Object>();
// start convert_to_v8 block
  if (name){
       to = Nan::New<v8::String>(name).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
          Nan::Set(toReturn, Nan::New("name").ToLocalChecked(), to);
// start convert_to_v8 block
  if (email){
       to = Nan::New<v8::String>(email).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
          Nan::Set(toReturn, Nan::New("email").ToLocalChecked(), to);
        return info.GetReturnValue().Set(scope.Escape(toReturn));
  }
}
  
/*
     * @param Index callback
   */
NAN_METHOD(GitRepository::Index) {

  if (info.Length() == 0 || !info[0]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  IndexBaton* baton = new IndexBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;

        baton->repo = Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue();

  Nan::Callback *callback = new Nan::Callback(v8::Local<Function>::Cast(info[0]));
  IndexWorker *worker = new IndexWorker(baton, callback);

        worker->SaveToPersistent("repo", info.This());

  AsyncLibgit2QueueWorker(worker);
  return;
}

void GitRepository::IndexWorker::Execute() {
  git_error_clear();

  {
    LockMaster lockMaster(
      /*asyncAction: */true
            ,baton->repo
    );

    int result = git_repository_index(
&baton->out,baton->repo  );

      baton->error_code = result;

      if (result != GIT_OK && git_error_last() != NULL) {
        baton->error = git_error_dup(git_error_last());
      }

  }
}

void GitRepository::IndexWorker::HandleOKCallback() {
    if (baton->error_code == GIT_OK) {
    v8::Local<v8::Value> to;
// start convert_to_v8 block
    if (baton->out != NULL) {
      v8::Local<v8::Array> owners = Nan::New<Array>(0);
          Nan::Set(
          owners,
          Nan::New<v8::Number>(owners->Length()),
          Nan::To<v8::Object>(GitRepository::New(
            git_index_owner(baton->out),
            true
          )).ToLocalChecked()
        );
         to = GitIndex::New(
        baton->out,
        true
          , owners
       );
   }
  else {
    to = Nan::Null();
  }
  // end convert_to_v8 block
      v8::Local<v8::Value> result = to;

    v8::Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  } else {
    if (baton->error) {
      v8::Local<v8::Object> err;
      if (baton->error->message) {
        err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
      } else {
        err = Nan::To<v8::Object>(Nan::Error("Method index has thrown an error.")).ToLocalChecked();
      }
      Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.index").ToLocalChecked());
      v8::Local<v8::Value> argv[1] = {
        err
      };
      callback->Call(1, argv, async_resource);
      if (baton->error->message)
        free((void *)baton->error->message);
      free((void *)baton->error);
    } else if (baton->error_code < 0) {
      std::queue< v8::Local<v8::Value> > workerArguments;
      bool callbackFired = false;
      while(!workerArguments.empty()) {
        v8::Local<v8::Value> node = workerArguments.front();
        workerArguments.pop();

        if (
          !node->IsObject()
          || node->IsArray()
          || node->IsBooleanObject()
          || node->IsDate()
          || node->IsFunction()
          || node->IsNumberObject()
          || node->IsRegExp()
          || node->IsStringObject()
        ) {
          continue;
        }

        v8::Local<v8::Object> nodeObj = Nan::To<v8::Object>(node).ToLocalChecked();
        v8::Local<v8::Value> checkValue = GetPrivate(nodeObj, Nan::New("NodeGitPromiseError").ToLocalChecked());

        if (!checkValue.IsEmpty() && !checkValue->IsNull() && !checkValue->IsUndefined()) {
          v8::Local<v8::Value> argv[1] = {
            Nan::To<v8::Object>(checkValue).ToLocalChecked()
          };
          callback->Call(1, argv, async_resource);
          callbackFired = true;
          break;
        }

        v8::Local<v8::Array> properties = Nan::GetPropertyNames(nodeObj).ToLocalChecked();
        for (unsigned int propIndex = 0; propIndex < properties->Length(); ++propIndex) {
          v8::Local<v8::String> propName = Nan::To<v8::String>(Nan::Get(properties, propIndex).ToLocalChecked()).ToLocalChecked();
          v8::Local<v8::Value> nodeToQueue = Nan::Get(nodeObj, propName).ToLocalChecked();
          if (!nodeToQueue->IsUndefined()) {
            workerArguments.push(nodeToQueue);
          }
        }
      }

      if (!callbackFired) {
        v8::Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Method index has thrown an error.")).ToLocalChecked();
        Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
        Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.index").ToLocalChecked());
        v8::Local<v8::Value> argv[1] = {
          err
        };
        callback->Call(1, argv, async_resource);
      }
    } else {
      callback->Call(0, NULL, async_resource);
    }

  }


  delete baton;
}

  
/*
  * @param String path
   * @param Number is_bare
    * @param Repository callback
   */
NAN_METHOD(GitRepository::Init) {

  if (info.Length() == 0 || !info[0]->IsString()) {
    return Nan::ThrowError("String path is required.");
  }

  if (info.Length() == 1 || !info[1]->IsNumber()) {
    return Nan::ThrowError("Number is_bare is required.");
  }

  if (info.Length() == 2 || !info[2]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  InitBaton* baton = new InitBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;

// start convert_from_v8 block
  const char * from_path = NULL;

  Nan::Utf8String path(Nan::To<v8::String>(info[0]).ToLocalChecked());
  // malloc with one extra byte so we can add the terminating null character C-strings expect:
  from_path = (const char *) malloc(path.length() + 1);
  // copy the characters from the nodejs string into our C-string (used instead of strdup or strcpy because nulls in
  // the middle of strings are valid coming from nodejs):
  memcpy((void *)from_path, *path, path.length());
  // ensure the final byte of our new string is null, extra casts added to ensure compatibility with various C types
  // used in the nodejs binding generation:
  memset((void *)(((char *)from_path) + path.length()), 0, 1);
// end convert_from_v8 block
          baton->path = from_path;
// start convert_from_v8 block
  unsigned int from_is_bare;
      from_is_bare = (unsigned int)   info[1].As<v8::Number>()->Value();
// end convert_from_v8 block
          baton->is_bare = from_is_bare;

  Nan::Callback *callback = new Nan::Callback(v8::Local<Function>::Cast(info[2]));
  InitWorker *worker = new InitWorker(baton, callback);

        if (!info[0]->IsUndefined() && !info[0]->IsNull())
          worker->SaveToPersistent("path", Nan::To<v8::Object>(info[0]).ToLocalChecked());
        if (!info[1]->IsUndefined() && !info[1]->IsNull())
          worker->SaveToPersistent("is_bare", Nan::To<v8::Object>(info[1]).ToLocalChecked());

  AsyncLibgit2QueueWorker(worker);
  return;
}

void GitRepository::InitWorker::Execute() {
  git_error_clear();

  {
    LockMaster lockMaster(
      /*asyncAction: */true
            ,baton->path
    );

    int result = git_repository_init(
&baton->out,baton->path,baton->is_bare  );

      baton->error_code = result;

      if (result != GIT_OK && git_error_last() != NULL) {
        baton->error = git_error_dup(git_error_last());
      }

  }
}

void GitRepository::InitWorker::HandleOKCallback() {
    if (baton->error_code == GIT_OK) {
    v8::Local<v8::Value> to;
// start convert_to_v8 block
    if (baton->out != NULL) {
        to = GitRepository::New(
        baton->out,
        true
       );
   }
  else {
    to = Nan::Null();
  }
  // end convert_to_v8 block
      v8::Local<v8::Value> result = to;

    v8::Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  } else {
    if (baton->error) {
      v8::Local<v8::Object> err;
      if (baton->error->message) {
        err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
      } else {
        err = Nan::To<v8::Object>(Nan::Error("Method init has thrown an error.")).ToLocalChecked();
      }
      Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.init").ToLocalChecked());
      v8::Local<v8::Value> argv[1] = {
        err
      };
      callback->Call(1, argv, async_resource);
      if (baton->error->message)
        free((void *)baton->error->message);
      free((void *)baton->error);
    } else if (baton->error_code < 0) {
      std::queue< v8::Local<v8::Value> > workerArguments;
              workerArguments.push(GetFromPersistent("path"));
              workerArguments.push(GetFromPersistent("is_bare"));
      bool callbackFired = false;
      while(!workerArguments.empty()) {
        v8::Local<v8::Value> node = workerArguments.front();
        workerArguments.pop();

        if (
          !node->IsObject()
          || node->IsArray()
          || node->IsBooleanObject()
          || node->IsDate()
          || node->IsFunction()
          || node->IsNumberObject()
          || node->IsRegExp()
          || node->IsStringObject()
        ) {
          continue;
        }

        v8::Local<v8::Object> nodeObj = Nan::To<v8::Object>(node).ToLocalChecked();
        v8::Local<v8::Value> checkValue = GetPrivate(nodeObj, Nan::New("NodeGitPromiseError").ToLocalChecked());

        if (!checkValue.IsEmpty() && !checkValue->IsNull() && !checkValue->IsUndefined()) {
          v8::Local<v8::Value> argv[1] = {
            Nan::To<v8::Object>(checkValue).ToLocalChecked()
          };
          callback->Call(1, argv, async_resource);
          callbackFired = true;
          break;
        }

        v8::Local<v8::Array> properties = Nan::GetPropertyNames(nodeObj).ToLocalChecked();
        for (unsigned int propIndex = 0; propIndex < properties->Length(); ++propIndex) {
          v8::Local<v8::String> propName = Nan::To<v8::String>(Nan::Get(properties, propIndex).ToLocalChecked()).ToLocalChecked();
          v8::Local<v8::Value> nodeToQueue = Nan::Get(nodeObj, propName).ToLocalChecked();
          if (!nodeToQueue->IsUndefined()) {
            workerArguments.push(nodeToQueue);
          }
        }
      }

      if (!callbackFired) {
        v8::Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Method init has thrown an error.")).ToLocalChecked();
        Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
        Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.init").ToLocalChecked());
        v8::Local<v8::Value> argv[1] = {
          err
        };
        callback->Call(1, argv, async_resource);
      }
    } else {
      callback->Call(0, NULL, async_resource);
    }

  }


  delete baton;
}

  
/*
  * @param String repo_path
   * @param RepositoryInitOptions opts
    * @param Repository callback
   */
NAN_METHOD(GitRepository::InitExt) {

  if (info.Length() == 0 || !info[0]->IsString()) {
    return Nan::ThrowError("String repo_path is required.");
  }

  if (info.Length() == 1 || !info[1]->IsObject()) {
    return Nan::ThrowError("RepositoryInitOptions opts is required.");
  }

  if (info.Length() == 2 || !info[2]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  InitExtBaton* baton = new InitExtBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;

// start convert_from_v8 block
  const char * from_repo_path = NULL;

  Nan::Utf8String repo_path(Nan::To<v8::String>(info[0]).ToLocalChecked());
  // malloc with one extra byte so we can add the terminating null character C-strings expect:
  from_repo_path = (const char *) malloc(repo_path.length() + 1);
  // copy the characters from the nodejs string into our C-string (used instead of strdup or strcpy because nulls in
  // the middle of strings are valid coming from nodejs):
  memcpy((void *)from_repo_path, *repo_path, repo_path.length());
  // ensure the final byte of our new string is null, extra casts added to ensure compatibility with various C types
  // used in the nodejs binding generation:
  memset((void *)(((char *)from_repo_path) + repo_path.length()), 0, 1);
// end convert_from_v8 block
          baton->repo_path = from_repo_path;
// start convert_from_v8 block
  git_repository_init_options * from_opts = NULL;
from_opts = Nan::ObjectWrap::Unwrap<GitRepositoryInitOptions>(Nan::To<v8::Object>(info[1]).ToLocalChecked())->GetValue();
// end convert_from_v8 block
          baton->opts = from_opts;

  Nan::Callback *callback = new Nan::Callback(v8::Local<Function>::Cast(info[2]));
  InitExtWorker *worker = new InitExtWorker(baton, callback);

        if (!info[0]->IsUndefined() && !info[0]->IsNull())
          worker->SaveToPersistent("repo_path", Nan::To<v8::Object>(info[0]).ToLocalChecked());
        if (!info[1]->IsUndefined() && !info[1]->IsNull())
          worker->SaveToPersistent("opts", Nan::To<v8::Object>(info[1]).ToLocalChecked());

  AsyncLibgit2QueueWorker(worker);
  return;
}

void GitRepository::InitExtWorker::Execute() {
  git_error_clear();

  {
    LockMaster lockMaster(
      /*asyncAction: */true
            ,baton->repo_path
            ,baton->opts
    );

    int result = git_repository_init_ext(
&baton->out,baton->repo_path,baton->opts  );

      baton->error_code = result;

      if (result != GIT_OK && git_error_last() != NULL) {
        baton->error = git_error_dup(git_error_last());
      }

  }
}

void GitRepository::InitExtWorker::HandleOKCallback() {
    if (baton->error_code == GIT_OK) {
    v8::Local<v8::Value> to;
// start convert_to_v8 block
    if (baton->out != NULL) {
        to = GitRepository::New(
        baton->out,
        true
       );
   }
  else {
    to = Nan::Null();
  }
  // end convert_to_v8 block
      v8::Local<v8::Value> result = to;

    v8::Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  } else {
    if (baton->error) {
      v8::Local<v8::Object> err;
      if (baton->error->message) {
        err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
      } else {
        err = Nan::To<v8::Object>(Nan::Error("Method initExt has thrown an error.")).ToLocalChecked();
      }
      Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.initExt").ToLocalChecked());
      v8::Local<v8::Value> argv[1] = {
        err
      };
      callback->Call(1, argv, async_resource);
      if (baton->error->message)
        free((void *)baton->error->message);
      free((void *)baton->error);
    } else if (baton->error_code < 0) {
      std::queue< v8::Local<v8::Value> > workerArguments;
              workerArguments.push(GetFromPersistent("repo_path"));
              workerArguments.push(GetFromPersistent("opts"));
      bool callbackFired = false;
      while(!workerArguments.empty()) {
        v8::Local<v8::Value> node = workerArguments.front();
        workerArguments.pop();

        if (
          !node->IsObject()
          || node->IsArray()
          || node->IsBooleanObject()
          || node->IsDate()
          || node->IsFunction()
          || node->IsNumberObject()
          || node->IsRegExp()
          || node->IsStringObject()
        ) {
          continue;
        }

        v8::Local<v8::Object> nodeObj = Nan::To<v8::Object>(node).ToLocalChecked();
        v8::Local<v8::Value> checkValue = GetPrivate(nodeObj, Nan::New("NodeGitPromiseError").ToLocalChecked());

        if (!checkValue.IsEmpty() && !checkValue->IsNull() && !checkValue->IsUndefined()) {
          v8::Local<v8::Value> argv[1] = {
            Nan::To<v8::Object>(checkValue).ToLocalChecked()
          };
          callback->Call(1, argv, async_resource);
          callbackFired = true;
          break;
        }

        v8::Local<v8::Array> properties = Nan::GetPropertyNames(nodeObj).ToLocalChecked();
        for (unsigned int propIndex = 0; propIndex < properties->Length(); ++propIndex) {
          v8::Local<v8::String> propName = Nan::To<v8::String>(Nan::Get(properties, propIndex).ToLocalChecked()).ToLocalChecked();
          v8::Local<v8::Value> nodeToQueue = Nan::Get(nodeObj, propName).ToLocalChecked();
          if (!nodeToQueue->IsUndefined()) {
            workerArguments.push(nodeToQueue);
          }
        }
      }

      if (!callbackFired) {
        v8::Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Method initExt has thrown an error.")).ToLocalChecked();
        Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
        Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.initExt").ToLocalChecked());
        v8::Local<v8::Value> argv[1] = {
          err
        };
        callback->Call(1, argv, async_resource);
      }
    } else {
      callback->Call(0, NULL, async_resource);
    }

  }


  delete baton;
}

   
/*
     * @return Number  result    */
NAN_METHOD(GitRepository::IsBare) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

 int result =     git_repository_is_bare(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
     * @return Number  result    */
NAN_METHOD(GitRepository::IsEmpty) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

 int result =     git_repository_is_empty(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
     * @return Number  result    */
NAN_METHOD(GitRepository::IsShallow) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

 int result =     git_repository_is_shallow(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
     * @return Number  result    */
NAN_METHOD(GitRepository::IsWorktree) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

 int result =     git_repository_is_worktree(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
  
/*
    * @param Number item
    * @param Buf callback
   */
NAN_METHOD(GitRepository::ItemPath) {

  if (info.Length() == 0 || !info[0]->IsNumber()) {
    return Nan::ThrowError("Number item is required.");
  }

  if (info.Length() == 1 || !info[1]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  ItemPathBaton* baton = new ItemPathBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;

        baton->repo = Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue();
// start convert_from_v8 block
  git_repository_item_t from_item;
      from_item = (git_repository_item_t)  (int) info[0].As<v8::Number>()->Value();
// end convert_from_v8 block
          baton->item = from_item;

  Nan::Callback *callback = new Nan::Callback(v8::Local<Function>::Cast(info[1]));
  ItemPathWorker *worker = new ItemPathWorker(baton, callback);

        worker->SaveToPersistent("repo", info.This());
        if (!info[0]->IsUndefined() && !info[0]->IsNull())
          worker->SaveToPersistent("item", Nan::To<v8::Object>(info[0]).ToLocalChecked());

  AsyncLibgit2QueueWorker(worker);
  return;
}

void GitRepository::ItemPathWorker::Execute() {
  git_error_clear();

  {
    LockMaster lockMaster(
      /*asyncAction: */true
            ,baton->out
            ,baton->repo
    );

    int result = git_repository_item_path(
baton->out,baton->repo,baton->item  );

      baton->error_code = result;

      if (result != GIT_OK && git_error_last() != NULL) {
        baton->error = git_error_dup(git_error_last());
      }

  }
}

void GitRepository::ItemPathWorker::HandleOKCallback() {
    if (baton->error_code == GIT_OK) {
    v8::Local<v8::Value> to;
// start convert_to_v8 block
   if (baton->out) {
    to = Nan::New<v8::String>(baton->out->ptr, baton->out->size).ToLocalChecked();
  }
  else {
    to = Nan::Null();
  }
  // end convert_to_v8 block
      v8::Local<v8::Value> result = to;

    v8::Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  } else {
    if (baton->error) {
      v8::Local<v8::Object> err;
      if (baton->error->message) {
        err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
      } else {
        err = Nan::To<v8::Object>(Nan::Error("Method itemPath has thrown an error.")).ToLocalChecked();
      }
      Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.itemPath").ToLocalChecked());
      v8::Local<v8::Value> argv[1] = {
        err
      };
      callback->Call(1, argv, async_resource);
      if (baton->error->message)
        free((void *)baton->error->message);
      free((void *)baton->error);
    } else if (baton->error_code < 0) {
      std::queue< v8::Local<v8::Value> > workerArguments;
              workerArguments.push(GetFromPersistent("item"));
      bool callbackFired = false;
      while(!workerArguments.empty()) {
        v8::Local<v8::Value> node = workerArguments.front();
        workerArguments.pop();

        if (
          !node->IsObject()
          || node->IsArray()
          || node->IsBooleanObject()
          || node->IsDate()
          || node->IsFunction()
          || node->IsNumberObject()
          || node->IsRegExp()
          || node->IsStringObject()
        ) {
          continue;
        }

        v8::Local<v8::Object> nodeObj = Nan::To<v8::Object>(node).ToLocalChecked();
        v8::Local<v8::Value> checkValue = GetPrivate(nodeObj, Nan::New("NodeGitPromiseError").ToLocalChecked());

        if (!checkValue.IsEmpty() && !checkValue->IsNull() && !checkValue->IsUndefined()) {
          v8::Local<v8::Value> argv[1] = {
            Nan::To<v8::Object>(checkValue).ToLocalChecked()
          };
          callback->Call(1, argv, async_resource);
          callbackFired = true;
          break;
        }

        v8::Local<v8::Array> properties = Nan::GetPropertyNames(nodeObj).ToLocalChecked();
        for (unsigned int propIndex = 0; propIndex < properties->Length(); ++propIndex) {
          v8::Local<v8::String> propName = Nan::To<v8::String>(Nan::Get(properties, propIndex).ToLocalChecked()).ToLocalChecked();
          v8::Local<v8::Value> nodeToQueue = Nan::Get(nodeObj, propName).ToLocalChecked();
          if (!nodeToQueue->IsUndefined()) {
            workerArguments.push(nodeToQueue);
          }
        }
      }

      if (!callbackFired) {
        v8::Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Method itemPath has thrown an error.")).ToLocalChecked();
        Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
        Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.itemPath").ToLocalChecked());
        v8::Local<v8::Value> argv[1] = {
          err
        };
        callback->Call(1, argv, async_resource);
      }
    } else {
      callback->Call(0, NULL, async_resource);
    }

  }

        git_buf_dispose(baton->out);
        free((void *)baton->out);

  delete baton;
}

  
/*
   * @param RepositoryMergeheadForeachCb callback
   * @param Void payload
     */
NAN_METHOD(GitRepository::MergeheadForeach) {

  if (info.Length() == 0 || !info[0]->IsFunction()) {
    return Nan::ThrowError("RepositoryMergeheadForeachCb callback is required.");
  }
  if (info.Length() == 2 || !info[2]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  MergeheadForeachBaton* baton = new MergeheadForeachBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;

      MergeheadForeach_globalPayload* globalPayload = new MergeheadForeach_globalPayload;
        baton->repo = Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue();
        if (!info[0]->IsFunction()) {
          baton->callback = NULL;
          globalPayload->callback = NULL;
        }
        else {
          baton->callback = MergeheadForeach_callback_cppCallback;
            globalPayload->callback = new Nan::Callback(info[0].As<Function>());
        }
          baton->payload = globalPayload;

  Nan::Callback *callback = new Nan::Callback(v8::Local<Function>::Cast(info[2]));
  MergeheadForeachWorker *worker = new MergeheadForeachWorker(baton, callback);

        worker->SaveToPersistent("repo", info.This());
        if (!info[1]->IsUndefined() && !info[1]->IsNull())
          worker->SaveToPersistent("payload", Nan::To<v8::Object>(info[1]).ToLocalChecked());

  AsyncLibgit2QueueWorker(worker);
  return;
}

void GitRepository::MergeheadForeachWorker::Execute() {
  git_error_clear();

  {
    LockMaster lockMaster(
      /*asyncAction: */true
            ,baton->repo
            ,baton->payload
    );

    int result = git_repository_mergehead_foreach(
baton->repo,baton->callback,baton->payload  );

      baton->error_code = result;

      if (result != GIT_OK && git_error_last() != NULL) {
        baton->error = git_error_dup(git_error_last());
      }

  }
}

void GitRepository::MergeheadForeachWorker::HandleOKCallback() {
    if (baton->error_code == GIT_OK) {
    v8::Local<v8::Value> result = Nan::Undefined();

    v8::Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  } else {
    if (baton->error) {
      v8::Local<v8::Object> err;
      if (baton->error->message) {
        err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
      } else {
        err = Nan::To<v8::Object>(Nan::Error("Method mergeheadForeach has thrown an error.")).ToLocalChecked();
      }
      Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.mergeheadForeach").ToLocalChecked());
      v8::Local<v8::Value> argv[1] = {
        err
      };
      callback->Call(1, argv, async_resource);
      if (baton->error->message)
        free((void *)baton->error->message);
      free((void *)baton->error);
    } else if (baton->error_code < 0) {
      std::queue< v8::Local<v8::Value> > workerArguments;
              workerArguments.push(GetFromPersistent("payload"));
      bool callbackFired = false;
      while(!workerArguments.empty()) {
        v8::Local<v8::Value> node = workerArguments.front();
        workerArguments.pop();

        if (
          !node->IsObject()
          || node->IsArray()
          || node->IsBooleanObject()
          || node->IsDate()
          || node->IsFunction()
          || node->IsNumberObject()
          || node->IsRegExp()
          || node->IsStringObject()
        ) {
          continue;
        }

        v8::Local<v8::Object> nodeObj = Nan::To<v8::Object>(node).ToLocalChecked();
        v8::Local<v8::Value> checkValue = GetPrivate(nodeObj, Nan::New("NodeGitPromiseError").ToLocalChecked());

        if (!checkValue.IsEmpty() && !checkValue->IsNull() && !checkValue->IsUndefined()) {
          v8::Local<v8::Value> argv[1] = {
            Nan::To<v8::Object>(checkValue).ToLocalChecked()
          };
          callback->Call(1, argv, async_resource);
          callbackFired = true;
          break;
        }

        v8::Local<v8::Array> properties = Nan::GetPropertyNames(nodeObj).ToLocalChecked();
        for (unsigned int propIndex = 0; propIndex < properties->Length(); ++propIndex) {
          v8::Local<v8::String> propName = Nan::To<v8::String>(Nan::Get(properties, propIndex).ToLocalChecked()).ToLocalChecked();
          v8::Local<v8::Value> nodeToQueue = Nan::Get(nodeObj, propName).ToLocalChecked();
          if (!nodeToQueue->IsUndefined()) {
            workerArguments.push(nodeToQueue);
          }
        }
      }

      if (!callbackFired) {
        v8::Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Method mergeheadForeach has thrown an error.")).ToLocalChecked();
        Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
        Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.mergeheadForeach").ToLocalChecked());
        v8::Local<v8::Value> argv[1] = {
          err
        };
        callback->Call(1, argv, async_resource);
      }
    } else {
      callback->Call(0, NULL, async_resource);
    }

  }

      delete (MergeheadForeach_globalPayload*)baton->payload;

  delete baton;
}


int GitRepository::MergeheadForeach_callback_cppCallback (
    const git_oid * oid,     void * payload  ) {
  MergeheadForeach_CallbackBaton baton(0);

    baton.oid = oid;
    baton.payload = payload;
 
  return baton.ExecuteAsync(MergeheadForeach_callback_async);
}

void GitRepository::MergeheadForeach_callback_async(void *untypedBaton) {
  Nan::HandleScope scope;

  MergeheadForeach_CallbackBaton* baton = static_cast<MergeheadForeach_CallbackBaton*>(untypedBaton);

   Nan::Callback* callback = ((MergeheadForeach_globalPayload*)baton->payload)->callback;
   
  v8::Local<Value> argv[1] = {
         GitOid::New(baton->oid, false)
    };

  Nan::TryCatch tryCatch;
  // TODO This should take an async_resource, but we will need to figure out how to pipe the correct context into this
  Nan::MaybeLocal<v8::Value> maybeResult = Nan::Call(*callback, 1, argv);
  v8::Local<v8::Value> result;
  if (!maybeResult.IsEmpty()) {
    result = maybeResult.ToLocalChecked();
  }

  if(PromiseCompletion::ForwardIfPromise(result, baton, MergeheadForeach_callback_promiseCompleted)) {
    return;
  }

    if (result.IsEmpty() || result->IsNativeError()) {
      baton->result = 1;
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

void GitRepository::MergeheadForeach_callback_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result) {
  Nan::HandleScope scope;

  MergeheadForeach_CallbackBaton* baton = static_cast<MergeheadForeach_CallbackBaton*>(_baton);

  if (isFulfilled) {
      if (result.IsEmpty() || result->IsNativeError()) {
        baton->result = 1;
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
   }
  else {
    // promise was rejected
    GitRepository* instance = static_cast<GitRepository*>(baton-> payload  );
    v8::Local<v8::Object> parent = instance->handle();
    SetPrivate(parent, Nan::New("NodeGitPromiseError").ToLocalChecked(), result);

    baton->result = 1;
  }
  baton->Done();
}
   
/*
     * @return Number  result    */
NAN_METHOD(GitRepository::MessageRemove) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

 int result =     git_repository_message_remove(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
  
/*
     * @param Odb callback
   */
NAN_METHOD(GitRepository::Odb) {

  if (info.Length() == 0 || !info[0]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  OdbBaton* baton = new OdbBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;

        baton->repo = Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue();

  Nan::Callback *callback = new Nan::Callback(v8::Local<Function>::Cast(info[0]));
  OdbWorker *worker = new OdbWorker(baton, callback);

        worker->SaveToPersistent("repo", info.This());

  AsyncLibgit2QueueWorker(worker);
  return;
}

void GitRepository::OdbWorker::Execute() {
  git_error_clear();

  {
    LockMaster lockMaster(
      /*asyncAction: */true
            ,baton->repo
    );

    int result = git_repository_odb(
&baton->out,baton->repo  );

      baton->error_code = result;

      if (result != GIT_OK && git_error_last() != NULL) {
        baton->error = git_error_dup(git_error_last());
      }

  }
}

void GitRepository::OdbWorker::HandleOKCallback() {
    if (baton->error_code == GIT_OK) {
    v8::Local<v8::Value> to;
// start convert_to_v8 block
    if (baton->out != NULL) {
        to = GitOdb::New(
        baton->out,
        true
       );
   }
  else {
    to = Nan::Null();
  }
  // end convert_to_v8 block
      v8::Local<v8::Value> result = to;

    v8::Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  } else {
    if (baton->error) {
      v8::Local<v8::Object> err;
      if (baton->error->message) {
        err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
      } else {
        err = Nan::To<v8::Object>(Nan::Error("Method odb has thrown an error.")).ToLocalChecked();
      }
      Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.odb").ToLocalChecked());
      v8::Local<v8::Value> argv[1] = {
        err
      };
      callback->Call(1, argv, async_resource);
      if (baton->error->message)
        free((void *)baton->error->message);
      free((void *)baton->error);
    } else if (baton->error_code < 0) {
      std::queue< v8::Local<v8::Value> > workerArguments;
      bool callbackFired = false;
      while(!workerArguments.empty()) {
        v8::Local<v8::Value> node = workerArguments.front();
        workerArguments.pop();

        if (
          !node->IsObject()
          || node->IsArray()
          || node->IsBooleanObject()
          || node->IsDate()
          || node->IsFunction()
          || node->IsNumberObject()
          || node->IsRegExp()
          || node->IsStringObject()
        ) {
          continue;
        }

        v8::Local<v8::Object> nodeObj = Nan::To<v8::Object>(node).ToLocalChecked();
        v8::Local<v8::Value> checkValue = GetPrivate(nodeObj, Nan::New("NodeGitPromiseError").ToLocalChecked());

        if (!checkValue.IsEmpty() && !checkValue->IsNull() && !checkValue->IsUndefined()) {
          v8::Local<v8::Value> argv[1] = {
            Nan::To<v8::Object>(checkValue).ToLocalChecked()
          };
          callback->Call(1, argv, async_resource);
          callbackFired = true;
          break;
        }

        v8::Local<v8::Array> properties = Nan::GetPropertyNames(nodeObj).ToLocalChecked();
        for (unsigned int propIndex = 0; propIndex < properties->Length(); ++propIndex) {
          v8::Local<v8::String> propName = Nan::To<v8::String>(Nan::Get(properties, propIndex).ToLocalChecked()).ToLocalChecked();
          v8::Local<v8::Value> nodeToQueue = Nan::Get(nodeObj, propName).ToLocalChecked();
          if (!nodeToQueue->IsUndefined()) {
            workerArguments.push(nodeToQueue);
          }
        }
      }

      if (!callbackFired) {
        v8::Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Method odb has thrown an error.")).ToLocalChecked();
        Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
        Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.odb").ToLocalChecked());
        v8::Local<v8::Value> argv[1] = {
          err
        };
        callback->Call(1, argv, async_resource);
      }
    } else {
      callback->Call(0, NULL, async_resource);
    }

  }


  delete baton;
}

  
/*
  * @param String path
    * @param Repository callback
   */
NAN_METHOD(GitRepository::Open) {

  if (info.Length() == 0 || !info[0]->IsString()) {
    return Nan::ThrowError("String path is required.");
  }

  if (info.Length() == 1 || !info[1]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  OpenBaton* baton = new OpenBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;

// start convert_from_v8 block
  const char * from_path = NULL;

  Nan::Utf8String path(Nan::To<v8::String>(info[0]).ToLocalChecked());
  // malloc with one extra byte so we can add the terminating null character C-strings expect:
  from_path = (const char *) malloc(path.length() + 1);
  // copy the characters from the nodejs string into our C-string (used instead of strdup or strcpy because nulls in
  // the middle of strings are valid coming from nodejs):
  memcpy((void *)from_path, *path, path.length());
  // ensure the final byte of our new string is null, extra casts added to ensure compatibility with various C types
  // used in the nodejs binding generation:
  memset((void *)(((char *)from_path) + path.length()), 0, 1);
// end convert_from_v8 block
          baton->path = from_path;

  Nan::Callback *callback = new Nan::Callback(v8::Local<Function>::Cast(info[1]));
  OpenWorker *worker = new OpenWorker(baton, callback);

        if (!info[0]->IsUndefined() && !info[0]->IsNull())
          worker->SaveToPersistent("path", Nan::To<v8::Object>(info[0]).ToLocalChecked());

  AsyncLibgit2QueueWorker(worker);
  return;
}

void GitRepository::OpenWorker::Execute() {
  git_error_clear();

  {
    LockMaster lockMaster(
      /*asyncAction: */true
            ,baton->path
    );

    int result = git_repository_open(
&baton->out,baton->path  );

      baton->error_code = result;

      if (result != GIT_OK && git_error_last() != NULL) {
        baton->error = git_error_dup(git_error_last());
      }

  }
}

void GitRepository::OpenWorker::HandleOKCallback() {
    if (baton->error_code == GIT_OK) {
    v8::Local<v8::Value> to;
// start convert_to_v8 block
    if (baton->out != NULL) {
        to = GitRepository::New(
        baton->out,
        true
       );
   }
  else {
    to = Nan::Null();
  }
  // end convert_to_v8 block
      v8::Local<v8::Value> result = to;

    v8::Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  } else {
    if (baton->error) {
      v8::Local<v8::Object> err;
      if (baton->error->message) {
        err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
      } else {
        err = Nan::To<v8::Object>(Nan::Error("Method open has thrown an error.")).ToLocalChecked();
      }
      Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.open").ToLocalChecked());
      v8::Local<v8::Value> argv[1] = {
        err
      };
      callback->Call(1, argv, async_resource);
      if (baton->error->message)
        free((void *)baton->error->message);
      free((void *)baton->error);
    } else if (baton->error_code < 0) {
      std::queue< v8::Local<v8::Value> > workerArguments;
              workerArguments.push(GetFromPersistent("path"));
      bool callbackFired = false;
      while(!workerArguments.empty()) {
        v8::Local<v8::Value> node = workerArguments.front();
        workerArguments.pop();

        if (
          !node->IsObject()
          || node->IsArray()
          || node->IsBooleanObject()
          || node->IsDate()
          || node->IsFunction()
          || node->IsNumberObject()
          || node->IsRegExp()
          || node->IsStringObject()
        ) {
          continue;
        }

        v8::Local<v8::Object> nodeObj = Nan::To<v8::Object>(node).ToLocalChecked();
        v8::Local<v8::Value> checkValue = GetPrivate(nodeObj, Nan::New("NodeGitPromiseError").ToLocalChecked());

        if (!checkValue.IsEmpty() && !checkValue->IsNull() && !checkValue->IsUndefined()) {
          v8::Local<v8::Value> argv[1] = {
            Nan::To<v8::Object>(checkValue).ToLocalChecked()
          };
          callback->Call(1, argv, async_resource);
          callbackFired = true;
          break;
        }

        v8::Local<v8::Array> properties = Nan::GetPropertyNames(nodeObj).ToLocalChecked();
        for (unsigned int propIndex = 0; propIndex < properties->Length(); ++propIndex) {
          v8::Local<v8::String> propName = Nan::To<v8::String>(Nan::Get(properties, propIndex).ToLocalChecked()).ToLocalChecked();
          v8::Local<v8::Value> nodeToQueue = Nan::Get(nodeObj, propName).ToLocalChecked();
          if (!nodeToQueue->IsUndefined()) {
            workerArguments.push(nodeToQueue);
          }
        }
      }

      if (!callbackFired) {
        v8::Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Method open has thrown an error.")).ToLocalChecked();
        Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
        Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.open").ToLocalChecked());
        v8::Local<v8::Value> argv[1] = {
          err
        };
        callback->Call(1, argv, async_resource);
      }
    } else {
      callback->Call(0, NULL, async_resource);
    }

  }


  delete baton;
}

  
/*
  * @param String bare_path
    * @param Repository callback
   */
NAN_METHOD(GitRepository::OpenBare) {

  if (info.Length() == 0 || !info[0]->IsString()) {
    return Nan::ThrowError("String bare_path is required.");
  }

  if (info.Length() == 1 || !info[1]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  OpenBareBaton* baton = new OpenBareBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;

// start convert_from_v8 block
  const char * from_bare_path = NULL;

  Nan::Utf8String bare_path(Nan::To<v8::String>(info[0]).ToLocalChecked());
  // malloc with one extra byte so we can add the terminating null character C-strings expect:
  from_bare_path = (const char *) malloc(bare_path.length() + 1);
  // copy the characters from the nodejs string into our C-string (used instead of strdup or strcpy because nulls in
  // the middle of strings are valid coming from nodejs):
  memcpy((void *)from_bare_path, *bare_path, bare_path.length());
  // ensure the final byte of our new string is null, extra casts added to ensure compatibility with various C types
  // used in the nodejs binding generation:
  memset((void *)(((char *)from_bare_path) + bare_path.length()), 0, 1);
// end convert_from_v8 block
          baton->bare_path = from_bare_path;

  Nan::Callback *callback = new Nan::Callback(v8::Local<Function>::Cast(info[1]));
  OpenBareWorker *worker = new OpenBareWorker(baton, callback);

        if (!info[0]->IsUndefined() && !info[0]->IsNull())
          worker->SaveToPersistent("bare_path", Nan::To<v8::Object>(info[0]).ToLocalChecked());

  AsyncLibgit2QueueWorker(worker);
  return;
}

void GitRepository::OpenBareWorker::Execute() {
  git_error_clear();

  {
    LockMaster lockMaster(
      /*asyncAction: */true
            ,baton->bare_path
    );

    int result = git_repository_open_bare(
&baton->out,baton->bare_path  );

      baton->error_code = result;

      if (result != GIT_OK && git_error_last() != NULL) {
        baton->error = git_error_dup(git_error_last());
      }

  }
}

void GitRepository::OpenBareWorker::HandleOKCallback() {
    if (baton->error_code == GIT_OK) {
    v8::Local<v8::Value> to;
// start convert_to_v8 block
    if (baton->out != NULL) {
        to = GitRepository::New(
        baton->out,
        true
       );
   }
  else {
    to = Nan::Null();
  }
  // end convert_to_v8 block
      v8::Local<v8::Value> result = to;

    v8::Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  } else {
    if (baton->error) {
      v8::Local<v8::Object> err;
      if (baton->error->message) {
        err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
      } else {
        err = Nan::To<v8::Object>(Nan::Error("Method openBare has thrown an error.")).ToLocalChecked();
      }
      Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.openBare").ToLocalChecked());
      v8::Local<v8::Value> argv[1] = {
        err
      };
      callback->Call(1, argv, async_resource);
      if (baton->error->message)
        free((void *)baton->error->message);
      free((void *)baton->error);
    } else if (baton->error_code < 0) {
      std::queue< v8::Local<v8::Value> > workerArguments;
              workerArguments.push(GetFromPersistent("bare_path"));
      bool callbackFired = false;
      while(!workerArguments.empty()) {
        v8::Local<v8::Value> node = workerArguments.front();
        workerArguments.pop();

        if (
          !node->IsObject()
          || node->IsArray()
          || node->IsBooleanObject()
          || node->IsDate()
          || node->IsFunction()
          || node->IsNumberObject()
          || node->IsRegExp()
          || node->IsStringObject()
        ) {
          continue;
        }

        v8::Local<v8::Object> nodeObj = Nan::To<v8::Object>(node).ToLocalChecked();
        v8::Local<v8::Value> checkValue = GetPrivate(nodeObj, Nan::New("NodeGitPromiseError").ToLocalChecked());

        if (!checkValue.IsEmpty() && !checkValue->IsNull() && !checkValue->IsUndefined()) {
          v8::Local<v8::Value> argv[1] = {
            Nan::To<v8::Object>(checkValue).ToLocalChecked()
          };
          callback->Call(1, argv, async_resource);
          callbackFired = true;
          break;
        }

        v8::Local<v8::Array> properties = Nan::GetPropertyNames(nodeObj).ToLocalChecked();
        for (unsigned int propIndex = 0; propIndex < properties->Length(); ++propIndex) {
          v8::Local<v8::String> propName = Nan::To<v8::String>(Nan::Get(properties, propIndex).ToLocalChecked()).ToLocalChecked();
          v8::Local<v8::Value> nodeToQueue = Nan::Get(nodeObj, propName).ToLocalChecked();
          if (!nodeToQueue->IsUndefined()) {
            workerArguments.push(nodeToQueue);
          }
        }
      }

      if (!callbackFired) {
        v8::Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Method openBare has thrown an error.")).ToLocalChecked();
        Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
        Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.openBare").ToLocalChecked());
        v8::Local<v8::Value> argv[1] = {
          err
        };
        callback->Call(1, argv, async_resource);
      }
    } else {
      callback->Call(0, NULL, async_resource);
    }

  }


  delete baton;
}

  
/*
  * @param String path
   * @param Number flags
   * @param String ceiling_dirs
    * @param Repository callback
   */
NAN_METHOD(GitRepository::OpenExt) {

  if (info.Length() == 0 || !info[0]->IsString()) {
    return Nan::ThrowError("String path is required.");
  }

  if (info.Length() == 1 || !info[1]->IsNumber()) {
    return Nan::ThrowError("Number flags is required.");
  }

  if (info.Length() == 2 || !info[2]->IsString()) {
    return Nan::ThrowError("String ceiling_dirs is required.");
  }

  if (info.Length() == 3 || !info[3]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  OpenExtBaton* baton = new OpenExtBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;

// start convert_from_v8 block
  const char * from_path = NULL;

  Nan::Utf8String path(Nan::To<v8::String>(info[0]).ToLocalChecked());
  // malloc with one extra byte so we can add the terminating null character C-strings expect:
  from_path = (const char *) malloc(path.length() + 1);
  // copy the characters from the nodejs string into our C-string (used instead of strdup or strcpy because nulls in
  // the middle of strings are valid coming from nodejs):
  memcpy((void *)from_path, *path, path.length());
  // ensure the final byte of our new string is null, extra casts added to ensure compatibility with various C types
  // used in the nodejs binding generation:
  memset((void *)(((char *)from_path) + path.length()), 0, 1);
// end convert_from_v8 block
          baton->path = from_path;
// start convert_from_v8 block
  unsigned int from_flags;
      from_flags = (unsigned int)   info[1].As<v8::Number>()->Value();
// end convert_from_v8 block
          baton->flags = from_flags;
// start convert_from_v8 block
  const char * from_ceiling_dirs = NULL;

  Nan::Utf8String ceiling_dirs(Nan::To<v8::String>(info[2]).ToLocalChecked());
  // malloc with one extra byte so we can add the terminating null character C-strings expect:
  from_ceiling_dirs = (const char *) malloc(ceiling_dirs.length() + 1);
  // copy the characters from the nodejs string into our C-string (used instead of strdup or strcpy because nulls in
  // the middle of strings are valid coming from nodejs):
  memcpy((void *)from_ceiling_dirs, *ceiling_dirs, ceiling_dirs.length());
  // ensure the final byte of our new string is null, extra casts added to ensure compatibility with various C types
  // used in the nodejs binding generation:
  memset((void *)(((char *)from_ceiling_dirs) + ceiling_dirs.length()), 0, 1);
// end convert_from_v8 block
          baton->ceiling_dirs = from_ceiling_dirs;

  Nan::Callback *callback = new Nan::Callback(v8::Local<Function>::Cast(info[3]));
  OpenExtWorker *worker = new OpenExtWorker(baton, callback);

        if (!info[0]->IsUndefined() && !info[0]->IsNull())
          worker->SaveToPersistent("path", Nan::To<v8::Object>(info[0]).ToLocalChecked());
        if (!info[1]->IsUndefined() && !info[1]->IsNull())
          worker->SaveToPersistent("flags", Nan::To<v8::Object>(info[1]).ToLocalChecked());
        if (!info[2]->IsUndefined() && !info[2]->IsNull())
          worker->SaveToPersistent("ceiling_dirs", Nan::To<v8::Object>(info[2]).ToLocalChecked());

  AsyncLibgit2QueueWorker(worker);
  return;
}

void GitRepository::OpenExtWorker::Execute() {
  git_error_clear();

  {
    LockMaster lockMaster(
      /*asyncAction: */true
            ,baton->path
            ,baton->ceiling_dirs
    );

    int result = git_repository_open_ext(
&baton->out,baton->path,baton->flags,baton->ceiling_dirs  );

      baton->error_code = result;

      if (result != GIT_OK && git_error_last() != NULL) {
        baton->error = git_error_dup(git_error_last());
      }

  }
}

void GitRepository::OpenExtWorker::HandleOKCallback() {
    if (baton->error_code == GIT_OK) {
    v8::Local<v8::Value> to;
// start convert_to_v8 block
    if (baton->out != NULL) {
        to = GitRepository::New(
        baton->out,
        true
       );
   }
  else {
    to = Nan::Null();
  }
  // end convert_to_v8 block
      v8::Local<v8::Value> result = to;

    v8::Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  } else {
    if (baton->error) {
      v8::Local<v8::Object> err;
      if (baton->error->message) {
        err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
      } else {
        err = Nan::To<v8::Object>(Nan::Error("Method openExt has thrown an error.")).ToLocalChecked();
      }
      Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.openExt").ToLocalChecked());
      v8::Local<v8::Value> argv[1] = {
        err
      };
      callback->Call(1, argv, async_resource);
      if (baton->error->message)
        free((void *)baton->error->message);
      free((void *)baton->error);
    } else if (baton->error_code < 0) {
      std::queue< v8::Local<v8::Value> > workerArguments;
              workerArguments.push(GetFromPersistent("path"));
              workerArguments.push(GetFromPersistent("flags"));
              workerArguments.push(GetFromPersistent("ceiling_dirs"));
      bool callbackFired = false;
      while(!workerArguments.empty()) {
        v8::Local<v8::Value> node = workerArguments.front();
        workerArguments.pop();

        if (
          !node->IsObject()
          || node->IsArray()
          || node->IsBooleanObject()
          || node->IsDate()
          || node->IsFunction()
          || node->IsNumberObject()
          || node->IsRegExp()
          || node->IsStringObject()
        ) {
          continue;
        }

        v8::Local<v8::Object> nodeObj = Nan::To<v8::Object>(node).ToLocalChecked();
        v8::Local<v8::Value> checkValue = GetPrivate(nodeObj, Nan::New("NodeGitPromiseError").ToLocalChecked());

        if (!checkValue.IsEmpty() && !checkValue->IsNull() && !checkValue->IsUndefined()) {
          v8::Local<v8::Value> argv[1] = {
            Nan::To<v8::Object>(checkValue).ToLocalChecked()
          };
          callback->Call(1, argv, async_resource);
          callbackFired = true;
          break;
        }

        v8::Local<v8::Array> properties = Nan::GetPropertyNames(nodeObj).ToLocalChecked();
        for (unsigned int propIndex = 0; propIndex < properties->Length(); ++propIndex) {
          v8::Local<v8::String> propName = Nan::To<v8::String>(Nan::Get(properties, propIndex).ToLocalChecked()).ToLocalChecked();
          v8::Local<v8::Value> nodeToQueue = Nan::Get(nodeObj, propName).ToLocalChecked();
          if (!nodeToQueue->IsUndefined()) {
            workerArguments.push(nodeToQueue);
          }
        }
      }

      if (!callbackFired) {
        v8::Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Method openExt has thrown an error.")).ToLocalChecked();
        Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
        Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.openExt").ToLocalChecked());
        v8::Local<v8::Value> argv[1] = {
          err
        };
        callback->Call(1, argv, async_resource);
      }
    } else {
      callback->Call(0, NULL, async_resource);
    }

  }


  delete baton;
}

  
/*
  * @param Worktree wt
    * @param Repository callback
   */
NAN_METHOD(GitRepository::OpenFromWorktree) {

  if (info.Length() == 0 || !info[0]->IsObject()) {
    return Nan::ThrowError("Worktree wt is required.");
  }

  if (info.Length() == 1 || !info[1]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  OpenFromWorktreeBaton* baton = new OpenFromWorktreeBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;

// start convert_from_v8 block
  git_worktree * from_wt = NULL;
from_wt = Nan::ObjectWrap::Unwrap<GitWorktree>(Nan::To<v8::Object>(info[0]).ToLocalChecked())->GetValue();
// end convert_from_v8 block
          baton->wt = from_wt;

  Nan::Callback *callback = new Nan::Callback(v8::Local<Function>::Cast(info[1]));
  OpenFromWorktreeWorker *worker = new OpenFromWorktreeWorker(baton, callback);

        if (!info[0]->IsUndefined() && !info[0]->IsNull())
          worker->SaveToPersistent("wt", Nan::To<v8::Object>(info[0]).ToLocalChecked());

  AsyncLibgit2QueueWorker(worker);
  return;
}

void GitRepository::OpenFromWorktreeWorker::Execute() {
  git_error_clear();

  {
    LockMaster lockMaster(
      /*asyncAction: */true
            ,baton->wt
    );

    int result = git_repository_open_from_worktree(
&baton->out,baton->wt  );

      baton->error_code = result;

      if (result != GIT_OK && git_error_last() != NULL) {
        baton->error = git_error_dup(git_error_last());
      }

  }
}

void GitRepository::OpenFromWorktreeWorker::HandleOKCallback() {
    if (baton->error_code == GIT_OK) {
    v8::Local<v8::Value> to;
// start convert_to_v8 block
    if (baton->out != NULL) {
        to = GitRepository::New(
        baton->out,
        true
       );
   }
  else {
    to = Nan::Null();
  }
  // end convert_to_v8 block
      v8::Local<v8::Value> result = to;

    v8::Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  } else {
    if (baton->error) {
      v8::Local<v8::Object> err;
      if (baton->error->message) {
        err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
      } else {
        err = Nan::To<v8::Object>(Nan::Error("Method openFromWorktree has thrown an error.")).ToLocalChecked();
      }
      Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.openFromWorktree").ToLocalChecked());
      v8::Local<v8::Value> argv[1] = {
        err
      };
      callback->Call(1, argv, async_resource);
      if (baton->error->message)
        free((void *)baton->error->message);
      free((void *)baton->error);
    } else if (baton->error_code < 0) {
      std::queue< v8::Local<v8::Value> > workerArguments;
              workerArguments.push(GetFromPersistent("wt"));
      bool callbackFired = false;
      while(!workerArguments.empty()) {
        v8::Local<v8::Value> node = workerArguments.front();
        workerArguments.pop();

        if (
          !node->IsObject()
          || node->IsArray()
          || node->IsBooleanObject()
          || node->IsDate()
          || node->IsFunction()
          || node->IsNumberObject()
          || node->IsRegExp()
          || node->IsStringObject()
        ) {
          continue;
        }

        v8::Local<v8::Object> nodeObj = Nan::To<v8::Object>(node).ToLocalChecked();
        v8::Local<v8::Value> checkValue = GetPrivate(nodeObj, Nan::New("NodeGitPromiseError").ToLocalChecked());

        if (!checkValue.IsEmpty() && !checkValue->IsNull() && !checkValue->IsUndefined()) {
          v8::Local<v8::Value> argv[1] = {
            Nan::To<v8::Object>(checkValue).ToLocalChecked()
          };
          callback->Call(1, argv, async_resource);
          callbackFired = true;
          break;
        }

        v8::Local<v8::Array> properties = Nan::GetPropertyNames(nodeObj).ToLocalChecked();
        for (unsigned int propIndex = 0; propIndex < properties->Length(); ++propIndex) {
          v8::Local<v8::String> propName = Nan::To<v8::String>(Nan::Get(properties, propIndex).ToLocalChecked()).ToLocalChecked();
          v8::Local<v8::Value> nodeToQueue = Nan::Get(nodeObj, propName).ToLocalChecked();
          if (!nodeToQueue->IsUndefined()) {
            workerArguments.push(nodeToQueue);
          }
        }
      }

      if (!callbackFired) {
        v8::Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Method openFromWorktree has thrown an error.")).ToLocalChecked();
        Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
        Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.openFromWorktree").ToLocalChecked());
        v8::Local<v8::Value> argv[1] = {
          err
        };
        callback->Call(1, argv, async_resource);
      }
    } else {
      callback->Call(0, NULL, async_resource);
    }

  }


  delete baton;
}

   
/*
     * @return String  result    */
NAN_METHOD(GitRepository::Path) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

 const char * result =     git_repository_path(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

        // null checks on pointers
        if (!result) {
          return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
        }

      v8::Local<v8::Value> to;
// start convert_to_v8 block
  if (result){
       to = Nan::New<v8::String>(result).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
  
/*
     * @param Refdb callback
   */
NAN_METHOD(GitRepository::Refdb) {

  if (info.Length() == 0 || !info[0]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  RefdbBaton* baton = new RefdbBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;

        baton->repo = Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue();

  Nan::Callback *callback = new Nan::Callback(v8::Local<Function>::Cast(info[0]));
  RefdbWorker *worker = new RefdbWorker(baton, callback);

        worker->SaveToPersistent("repo", info.This());

  AsyncLibgit2QueueWorker(worker);
  return;
}

void GitRepository::RefdbWorker::Execute() {
  git_error_clear();

  {
    LockMaster lockMaster(
      /*asyncAction: */true
            ,baton->repo
    );

    int result = git_repository_refdb(
&baton->out,baton->repo  );

      baton->error_code = result;

      if (result != GIT_OK && git_error_last() != NULL) {
        baton->error = git_error_dup(git_error_last());
      }

  }
}

void GitRepository::RefdbWorker::HandleOKCallback() {
    if (baton->error_code == GIT_OK) {
    v8::Local<v8::Value> to;
// start convert_to_v8 block
    if (baton->out != NULL) {
      v8::Local<v8::Array> owners = Nan::New<Array>(0);
            Nan::Set(owners, Nan::New<v8::Number>(owners->Length()), Nan::To<v8::Object>(this->GetFromPersistent("repo")).ToLocalChecked());
             to = GitRefdb::New(
        baton->out,
        true
          , owners
       );
   }
  else {
    to = Nan::Null();
  }
  // end convert_to_v8 block
      v8::Local<v8::Value> result = to;

    v8::Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  } else {
    if (baton->error) {
      v8::Local<v8::Object> err;
      if (baton->error->message) {
        err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
      } else {
        err = Nan::To<v8::Object>(Nan::Error("Method refdb has thrown an error.")).ToLocalChecked();
      }
      Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.refdb").ToLocalChecked());
      v8::Local<v8::Value> argv[1] = {
        err
      };
      callback->Call(1, argv, async_resource);
      if (baton->error->message)
        free((void *)baton->error->message);
      free((void *)baton->error);
    } else if (baton->error_code < 0) {
      std::queue< v8::Local<v8::Value> > workerArguments;
      bool callbackFired = false;
      while(!workerArguments.empty()) {
        v8::Local<v8::Value> node = workerArguments.front();
        workerArguments.pop();

        if (
          !node->IsObject()
          || node->IsArray()
          || node->IsBooleanObject()
          || node->IsDate()
          || node->IsFunction()
          || node->IsNumberObject()
          || node->IsRegExp()
          || node->IsStringObject()
        ) {
          continue;
        }

        v8::Local<v8::Object> nodeObj = Nan::To<v8::Object>(node).ToLocalChecked();
        v8::Local<v8::Value> checkValue = GetPrivate(nodeObj, Nan::New("NodeGitPromiseError").ToLocalChecked());

        if (!checkValue.IsEmpty() && !checkValue->IsNull() && !checkValue->IsUndefined()) {
          v8::Local<v8::Value> argv[1] = {
            Nan::To<v8::Object>(checkValue).ToLocalChecked()
          };
          callback->Call(1, argv, async_resource);
          callbackFired = true;
          break;
        }

        v8::Local<v8::Array> properties = Nan::GetPropertyNames(nodeObj).ToLocalChecked();
        for (unsigned int propIndex = 0; propIndex < properties->Length(); ++propIndex) {
          v8::Local<v8::String> propName = Nan::To<v8::String>(Nan::Get(properties, propIndex).ToLocalChecked()).ToLocalChecked();
          v8::Local<v8::Value> nodeToQueue = Nan::Get(nodeObj, propName).ToLocalChecked();
          if (!nodeToQueue->IsUndefined()) {
            workerArguments.push(nodeToQueue);
          }
        }
      }

      if (!callbackFired) {
        v8::Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Method refdb has thrown an error.")).ToLocalChecked();
        Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
        Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.refdb").ToLocalChecked());
        v8::Local<v8::Value> argv[1] = {
          err
        };
        callback->Call(1, argv, async_resource);
      }
    } else {
      callback->Call(0, NULL, async_resource);
    }

  }


  delete baton;
}

  
/*
   * @param String refname
     */
NAN_METHOD(GitRepository::SetHead) {

  if (info.Length() == 0 || !info[0]->IsString()) {
    return Nan::ThrowError("String refname is required.");
  }

  if (info.Length() == 1 || !info[1]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  SetHeadBaton* baton = new SetHeadBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;

        baton->repo = Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue();
// start convert_from_v8 block
  const char * from_refname = NULL;

  Nan::Utf8String refname(Nan::To<v8::String>(info[0]).ToLocalChecked());
  // malloc with one extra byte so we can add the terminating null character C-strings expect:
  from_refname = (const char *) malloc(refname.length() + 1);
  // copy the characters from the nodejs string into our C-string (used instead of strdup or strcpy because nulls in
  // the middle of strings are valid coming from nodejs):
  memcpy((void *)from_refname, *refname, refname.length());
  // ensure the final byte of our new string is null, extra casts added to ensure compatibility with various C types
  // used in the nodejs binding generation:
  memset((void *)(((char *)from_refname) + refname.length()), 0, 1);
// end convert_from_v8 block
          baton->refname = from_refname;

  Nan::Callback *callback = new Nan::Callback(v8::Local<Function>::Cast(info[1]));
  SetHeadWorker *worker = new SetHeadWorker(baton, callback);

        worker->SaveToPersistent("repo", info.This());
        if (!info[0]->IsUndefined() && !info[0]->IsNull())
          worker->SaveToPersistent("refname", Nan::To<v8::Object>(info[0]).ToLocalChecked());

  AsyncLibgit2QueueWorker(worker);
  return;
}

void GitRepository::SetHeadWorker::Execute() {
  git_error_clear();

  {
    LockMaster lockMaster(
      /*asyncAction: */true
            ,baton->repo
            ,baton->refname
    );

    int result = git_repository_set_head(
baton->repo,baton->refname  );

      baton->error_code = result;

      if (result != GIT_OK && git_error_last() != NULL) {
        baton->error = git_error_dup(git_error_last());
      }

  }
}

void GitRepository::SetHeadWorker::HandleOKCallback() {
    if (baton->error_code == GIT_OK) {
    v8::Local<v8::Value> result = Nan::Undefined();

    v8::Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  } else {
    if (baton->error) {
      v8::Local<v8::Object> err;
      if (baton->error->message) {
        err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
      } else {
        err = Nan::To<v8::Object>(Nan::Error("Method setHead has thrown an error.")).ToLocalChecked();
      }
      Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.setHead").ToLocalChecked());
      v8::Local<v8::Value> argv[1] = {
        err
      };
      callback->Call(1, argv, async_resource);
      if (baton->error->message)
        free((void *)baton->error->message);
      free((void *)baton->error);
    } else if (baton->error_code < 0) {
      std::queue< v8::Local<v8::Value> > workerArguments;
              workerArguments.push(GetFromPersistent("refname"));
      bool callbackFired = false;
      while(!workerArguments.empty()) {
        v8::Local<v8::Value> node = workerArguments.front();
        workerArguments.pop();

        if (
          !node->IsObject()
          || node->IsArray()
          || node->IsBooleanObject()
          || node->IsDate()
          || node->IsFunction()
          || node->IsNumberObject()
          || node->IsRegExp()
          || node->IsStringObject()
        ) {
          continue;
        }

        v8::Local<v8::Object> nodeObj = Nan::To<v8::Object>(node).ToLocalChecked();
        v8::Local<v8::Value> checkValue = GetPrivate(nodeObj, Nan::New("NodeGitPromiseError").ToLocalChecked());

        if (!checkValue.IsEmpty() && !checkValue->IsNull() && !checkValue->IsUndefined()) {
          v8::Local<v8::Value> argv[1] = {
            Nan::To<v8::Object>(checkValue).ToLocalChecked()
          };
          callback->Call(1, argv, async_resource);
          callbackFired = true;
          break;
        }

        v8::Local<v8::Array> properties = Nan::GetPropertyNames(nodeObj).ToLocalChecked();
        for (unsigned int propIndex = 0; propIndex < properties->Length(); ++propIndex) {
          v8::Local<v8::String> propName = Nan::To<v8::String>(Nan::Get(properties, propIndex).ToLocalChecked()).ToLocalChecked();
          v8::Local<v8::Value> nodeToQueue = Nan::Get(nodeObj, propName).ToLocalChecked();
          if (!nodeToQueue->IsUndefined()) {
            workerArguments.push(nodeToQueue);
          }
        }
      }

      if (!callbackFired) {
        v8::Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Method setHead has thrown an error.")).ToLocalChecked();
        Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
        Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.setHead").ToLocalChecked());
        v8::Local<v8::Value> argv[1] = {
          err
        };
        callback->Call(1, argv, async_resource);
      }
    } else {
      callback->Call(0, NULL, async_resource);
    }

  }


  delete baton;
}

   
/*
   * @param Oid commitish
     * @return Number  result    */
NAN_METHOD(GitRepository::SetHeadDetached) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0
    || (!info[0]->IsObject() && !info[0]->IsString())) {
    return Nan::ThrowError("Oid commitish is required.");
  }
// start convert_from_v8 block
  const git_oid * from_commitish = NULL;
  if (info[0]->IsString()) {
    // Try and parse in a string to a git_oid
    Nan::Utf8String oidString(Nan::To<v8::String>(info[0]).ToLocalChecked());
    git_oid *oidOut = (git_oid *)malloc(sizeof(git_oid));

    if (git_oid_fromstr(oidOut, (const char *) strdup(*oidString)) != GIT_OK) {
      free(oidOut);

      if (git_error_last()) {
        return Nan::ThrowError(git_error_last()->message);
      } else {
        return Nan::ThrowError("Unknown Error");
      }
    }

    from_commitish = oidOut;
  }
  else {
from_commitish = Nan::ObjectWrap::Unwrap<GitOid>(Nan::To<v8::Object>(info[0]).ToLocalChecked())->GetValue();
  }
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
            ,
              from_commitish
    );

 int result =     git_repository_set_head_detached(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
,          from_commitish
    );

      if (info[0]->IsString()) {
        free((void *)from_commitish);
      }

      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
   * @param AnnotatedCommit commitish
     * @return Number  result    */
NAN_METHOD(GitRepository::SetHeadDetachedFromAnnotated) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0 || !info[0]->IsObject()) {
    return Nan::ThrowError("AnnotatedCommit commitish is required.");
  }

// start convert_from_v8 block
  const git_annotated_commit * from_commitish = NULL;
from_commitish = Nan::ObjectWrap::Unwrap<GitAnnotatedCommit>(Nan::To<v8::Object>(info[0]).ToLocalChecked())->GetValue();
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
            ,
              from_commitish
    );

 int result =     git_repository_set_head_detached_from_annotated(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
,          from_commitish
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
   * @param String name
   * @param String email
     * @return Number  result    */
NAN_METHOD(GitRepository::SetIdent) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0 || !info[0]->IsString()) {
    return Nan::ThrowError("String name is required.");
  }

  if (info.Length() == 1 || !info[1]->IsString()) {
    return Nan::ThrowError("String email is required.");
  }

// start convert_from_v8 block
  const char * from_name = NULL;

  Nan::Utf8String name(Nan::To<v8::String>(info[0]).ToLocalChecked());
  // malloc with one extra byte so we can add the terminating null character C-strings expect:
  from_name = (const char *) malloc(name.length() + 1);
  // copy the characters from the nodejs string into our C-string (used instead of strdup or strcpy because nulls in
  // the middle of strings are valid coming from nodejs):
  memcpy((void *)from_name, *name, name.length());
  // ensure the final byte of our new string is null, extra casts added to ensure compatibility with various C types
  // used in the nodejs binding generation:
  memset((void *)(((char *)from_name) + name.length()), 0, 1);
// end convert_from_v8 block
// start convert_from_v8 block
  const char * from_email = NULL;

  Nan::Utf8String email(Nan::To<v8::String>(info[1]).ToLocalChecked());
  // malloc with one extra byte so we can add the terminating null character C-strings expect:
  from_email = (const char *) malloc(email.length() + 1);
  // copy the characters from the nodejs string into our C-string (used instead of strdup or strcpy because nulls in
  // the middle of strings are valid coming from nodejs):
  memcpy((void *)from_email, *email, email.length());
  // ensure the final byte of our new string is null, extra casts added to ensure compatibility with various C types
  // used in the nodejs binding generation:
  memset((void *)(((char *)from_email) + email.length()), 0, 1);
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
            ,
              from_name
            ,
              from_email
    );

 int result =     git_repository_set_ident(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
,          from_name
,          from_email
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
   * @param String nmspace
     * @return Number  result    */
NAN_METHOD(GitRepository::SetNamespace) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0 || !info[0]->IsString()) {
    return Nan::ThrowError("String nmspace is required.");
  }

// start convert_from_v8 block
  const char * from_nmspace = NULL;

  Nan::Utf8String nmspace(Nan::To<v8::String>(info[0]).ToLocalChecked());
  // malloc with one extra byte so we can add the terminating null character C-strings expect:
  from_nmspace = (const char *) malloc(nmspace.length() + 1);
  // copy the characters from the nodejs string into our C-string (used instead of strdup or strcpy because nulls in
  // the middle of strings are valid coming from nodejs):
  memcpy((void *)from_nmspace, *nmspace, nmspace.length());
  // ensure the final byte of our new string is null, extra casts added to ensure compatibility with various C types
  // used in the nodejs binding generation:
  memset((void *)(((char *)from_nmspace) + nmspace.length()), 0, 1);
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
            ,
              from_nmspace
    );

 int result =     git_repository_set_namespace(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
,          from_nmspace
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
   * @param String workdir
   * @param Number update_gitlink
     * @return Number  result    */
NAN_METHOD(GitRepository::SetWorkdir) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0 || !info[0]->IsString()) {
    return Nan::ThrowError("String workdir is required.");
  }

  if (info.Length() == 1 || !info[1]->IsNumber()) {
    return Nan::ThrowError("Number update_gitlink is required.");
  }

// start convert_from_v8 block
  const char * from_workdir = NULL;

  Nan::Utf8String workdir(Nan::To<v8::String>(info[0]).ToLocalChecked());
  // malloc with one extra byte so we can add the terminating null character C-strings expect:
  from_workdir = (const char *) malloc(workdir.length() + 1);
  // copy the characters from the nodejs string into our C-string (used instead of strdup or strcpy because nulls in
  // the middle of strings are valid coming from nodejs):
  memcpy((void *)from_workdir, *workdir, workdir.length());
  // ensure the final byte of our new string is null, extra casts added to ensure compatibility with various C types
  // used in the nodejs binding generation:
  memset((void *)(((char *)from_workdir) + workdir.length()), 0, 1);
// end convert_from_v8 block
// start convert_from_v8 block
  int from_update_gitlink;
      from_update_gitlink = (int)   info[1].As<v8::Number>()->Value();
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
            ,
              from_workdir
    );

 int result =     git_repository_set_workdir(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
,          from_workdir
,          from_update_gitlink
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
     * @return Number  result    */
NAN_METHOD(GitRepository::State) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

 int result =     git_repository_state(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
     * @return Number  result    */
NAN_METHOD(GitRepository::StateCleanup) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

 int result =     git_repository_state_cleanup(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
     * @return String  result    */
NAN_METHOD(GitRepository::Workdir) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

 const char * result =     git_repository_workdir(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

        // null checks on pointers
        if (!result) {
          return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
        }

      v8::Local<v8::Value> to;
// start convert_to_v8 block
  if (result){
       to = Nan::New<v8::String>(result).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
  
/*
  * @param Odb odb
    * @param Repository callback
   */
NAN_METHOD(GitRepository::WrapOdb) {

  if (info.Length() == 0 || !info[0]->IsObject()) {
    return Nan::ThrowError("Odb odb is required.");
  }

  if (info.Length() == 1 || !info[1]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  WrapOdbBaton* baton = new WrapOdbBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;

// start convert_from_v8 block
  git_odb * from_odb = NULL;
from_odb = Nan::ObjectWrap::Unwrap<GitOdb>(Nan::To<v8::Object>(info[0]).ToLocalChecked())->GetValue();
// end convert_from_v8 block
          baton->odb = from_odb;

  Nan::Callback *callback = new Nan::Callback(v8::Local<Function>::Cast(info[1]));
  WrapOdbWorker *worker = new WrapOdbWorker(baton, callback);

        if (!info[0]->IsUndefined() && !info[0]->IsNull())
          worker->SaveToPersistent("odb", Nan::To<v8::Object>(info[0]).ToLocalChecked());

  AsyncLibgit2QueueWorker(worker);
  return;
}

void GitRepository::WrapOdbWorker::Execute() {
  git_error_clear();

  {
    LockMaster lockMaster(
      /*asyncAction: */true
            ,baton->odb
    );

    int result = git_repository_wrap_odb(
&baton->out,baton->odb  );

      baton->error_code = result;

      if (result != GIT_OK && git_error_last() != NULL) {
        baton->error = git_error_dup(git_error_last());
      }

  }
}

void GitRepository::WrapOdbWorker::HandleOKCallback() {
    if (baton->error_code == GIT_OK) {
    v8::Local<v8::Value> to;
// start convert_to_v8 block
    if (baton->out != NULL) {
        to = GitRepository::New(
        baton->out,
        true
       );
   }
  else {
    to = Nan::Null();
  }
  // end convert_to_v8 block
      v8::Local<v8::Value> result = to;

    v8::Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  } else {
    if (baton->error) {
      v8::Local<v8::Object> err;
      if (baton->error->message) {
        err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
      } else {
        err = Nan::To<v8::Object>(Nan::Error("Method wrapOdb has thrown an error.")).ToLocalChecked();
      }
      Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.wrapOdb").ToLocalChecked());
      v8::Local<v8::Value> argv[1] = {
        err
      };
      callback->Call(1, argv, async_resource);
      if (baton->error->message)
        free((void *)baton->error->message);
      free((void *)baton->error);
    } else if (baton->error_code < 0) {
      std::queue< v8::Local<v8::Value> > workerArguments;
              workerArguments.push(GetFromPersistent("odb"));
      bool callbackFired = false;
      while(!workerArguments.empty()) {
        v8::Local<v8::Value> node = workerArguments.front();
        workerArguments.pop();

        if (
          !node->IsObject()
          || node->IsArray()
          || node->IsBooleanObject()
          || node->IsDate()
          || node->IsFunction()
          || node->IsNumberObject()
          || node->IsRegExp()
          || node->IsStringObject()
        ) {
          continue;
        }

        v8::Local<v8::Object> nodeObj = Nan::To<v8::Object>(node).ToLocalChecked();
        v8::Local<v8::Value> checkValue = GetPrivate(nodeObj, Nan::New("NodeGitPromiseError").ToLocalChecked());

        if (!checkValue.IsEmpty() && !checkValue->IsNull() && !checkValue->IsUndefined()) {
          v8::Local<v8::Value> argv[1] = {
            Nan::To<v8::Object>(checkValue).ToLocalChecked()
          };
          callback->Call(1, argv, async_resource);
          callbackFired = true;
          break;
        }

        v8::Local<v8::Array> properties = Nan::GetPropertyNames(nodeObj).ToLocalChecked();
        for (unsigned int propIndex = 0; propIndex < properties->Length(); ++propIndex) {
          v8::Local<v8::String> propName = Nan::To<v8::String>(Nan::Get(properties, propIndex).ToLocalChecked()).ToLocalChecked();
          v8::Local<v8::Value> nodeToQueue = Nan::Get(nodeObj, propName).ToLocalChecked();
          if (!nodeToQueue->IsUndefined()) {
            workerArguments.push(nodeToQueue);
          }
        }
      }

      if (!callbackFired) {
        v8::Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Method wrapOdb has thrown an error.")).ToLocalChecked();
        Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
        Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.wrapOdb").ToLocalChecked());
        v8::Local<v8::Value> argv[1] = {
          err
        };
        callback->Call(1, argv, async_resource);
      }
    } else {
      callback->Call(0, NULL, async_resource);
    }

  }


  delete baton;
}

  
/*
     */
NAN_METHOD(GitRepository::Cleanup) {

  if (info.Length() == 0 || !info[0]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  CleanupBaton* baton = new CleanupBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;

        baton->repo = Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue();

  Nan::Callback *callback = new Nan::Callback(v8::Local<Function>::Cast(info[0]));
  CleanupWorker *worker = new CleanupWorker(baton, callback);

        worker->SaveToPersistent("repo", info.This());

  AsyncLibgit2QueueWorker(worker);
  return;
}

void GitRepository::CleanupWorker::Execute() {
  git_error_clear();

  {
    LockMaster lockMaster(
      /*asyncAction: */true
            ,baton->repo
    );

    git_repository__cleanup(
baton->repo  );

  }
}

void GitRepository::CleanupWorker::HandleOKCallback() {
    if (baton->error_code == GIT_OK) {
    v8::Local<v8::Value> result = Nan::Undefined();

    v8::Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  } else {
    if (baton->error) {
      v8::Local<v8::Object> err;
      if (baton->error->message) {
        err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
      } else {
        err = Nan::To<v8::Object>(Nan::Error("Method cleanup has thrown an error.")).ToLocalChecked();
      }
      Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.cleanup").ToLocalChecked());
      v8::Local<v8::Value> argv[1] = {
        err
      };
      callback->Call(1, argv, async_resource);
      if (baton->error->message)
        free((void *)baton->error->message);
      free((void *)baton->error);
    } else if (baton->error_code < 0) {
      std::queue< v8::Local<v8::Value> > workerArguments;
      bool callbackFired = false;
      while(!workerArguments.empty()) {
        v8::Local<v8::Value> node = workerArguments.front();
        workerArguments.pop();

        if (
          !node->IsObject()
          || node->IsArray()
          || node->IsBooleanObject()
          || node->IsDate()
          || node->IsFunction()
          || node->IsNumberObject()
          || node->IsRegExp()
          || node->IsStringObject()
        ) {
          continue;
        }

        v8::Local<v8::Object> nodeObj = Nan::To<v8::Object>(node).ToLocalChecked();
        v8::Local<v8::Value> checkValue = GetPrivate(nodeObj, Nan::New("NodeGitPromiseError").ToLocalChecked());

        if (!checkValue.IsEmpty() && !checkValue->IsNull() && !checkValue->IsUndefined()) {
          v8::Local<v8::Value> argv[1] = {
            Nan::To<v8::Object>(checkValue).ToLocalChecked()
          };
          callback->Call(1, argv, async_resource);
          callbackFired = true;
          break;
        }

        v8::Local<v8::Array> properties = Nan::GetPropertyNames(nodeObj).ToLocalChecked();
        for (unsigned int propIndex = 0; propIndex < properties->Length(); ++propIndex) {
          v8::Local<v8::String> propName = Nan::To<v8::String>(Nan::Get(properties, propIndex).ToLocalChecked()).ToLocalChecked();
          v8::Local<v8::Value> nodeToQueue = Nan::Get(nodeObj, propName).ToLocalChecked();
          if (!nodeToQueue->IsUndefined()) {
            workerArguments.push(nodeToQueue);
          }
        }
      }

      if (!callbackFired) {
        v8::Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Method cleanup has thrown an error.")).ToLocalChecked();
        Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
        Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.cleanup").ToLocalChecked());
        v8::Local<v8::Value> argv[1] = {
          err
        };
        callback->Call(1, argv, async_resource);
      }
    } else {
      callback->Call(0, NULL, async_resource);
    }

  }


  delete baton;
}

        NAN_METHOD(GitRepository::GetReferences)
{
  if (info.Length() == 0 || !info[0]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  GetReferencesBaton* baton = new GetReferencesBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;
  baton->out = new std::vector<git_reference *>;
  baton->repo = Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue();

  Nan::Callback *callback = new Nan::Callback(Local<Function>::Cast(info[0]));
  GetReferencesWorker *worker = new GetReferencesWorker(baton, callback);
  worker->SaveToPersistent("repo", info.This());
  Nan::AsyncQueueWorker(worker);
  return;
}

void GitRepository::GetReferencesWorker::Execute()
{
  giterr_clear();

  LockMaster lockMaster(true, baton->repo);
  git_repository *repo = baton->repo;

  git_strarray reference_names;
  baton->error_code = git_reference_list(&reference_names, repo);

  if (baton->error_code != GIT_OK) {
    if (giterr_last() != NULL) {
      baton->error = git_error_dup(giterr_last());
    }
    delete baton->out;
    baton->out = NULL;
    return;
  }

  for (size_t reference_index = 0; reference_index < reference_names.count; ++reference_index) {
    git_reference *reference;
    baton->error_code = git_reference_lookup(&reference, repo, reference_names.strings[reference_index]);

    // stop execution and return if there is an error
    if (baton->error_code != GIT_OK) {
      if (giterr_last() != NULL) {
        baton->error = git_error_dup(giterr_last());
      }

      // unwind and return
      while (baton->out->size()) {
        git_reference *referenceToFree = baton->out->back();
        baton->out->pop_back();
        git_reference_free(referenceToFree);
      }

      git_strarray_free(&reference_names);
      git_repository_free(repo);
      delete baton->out;
      baton->out = NULL;
      return;
    }

    if (git_reference_type(reference) == GIT_REF_SYMBOLIC) {
      git_reference *resolved_reference;
      int resolve_result = git_reference_resolve(&resolved_reference, reference);
      git_reference_free(reference);

      // if we can't resolve the ref, then just ignore it
      if (resolve_result == GIT_OK) {
        baton->out->push_back(resolved_reference);
      }
    } else {
      baton->out->push_back(reference);
    }
  }
}

void GitRepository::GetReferencesWorker::HandleOKCallback()
{
  if (baton->out != NULL)
  {
    unsigned int size = baton->out->size();
    Local<Array> result = Nan::New<Array>(size);
    for (unsigned int i = 0; i < size; i++) {
      git_reference *reference = baton->out->at(i);
      Nan::Set(
        result,
        Nan::New<Number>(i),
        GitRefs::New(
          reference,
          true,
          Nan::To<v8::Object>(GitRepository::New(git_reference_owner(reference), true)).ToLocalChecked()
        )
      );
    }

    delete baton->out;

    Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  }
  else if (baton->error)
  {
    Local<v8::Value> argv[1] = {
      Nan::Error(baton->error->message)
    };
    callback->Call(1, argv, async_resource);
    if (baton->error->message)
    {
      free((void *)baton->error->message);
    }

    free((void *)baton->error);
  }
  else if (baton->error_code < 0)
  {
    Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Repository getReferences has thrown an error.")).ToLocalChecked();
    Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
    Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.getReferences").ToLocalChecked());
    Local<v8::Value> argv[1] = {
      err
    };
    callback->Call(1, argv, async_resource);
  }
  else
  {
    callback->Call(0, NULL, async_resource);
  }
}

        NAN_METHOD(GitRepository::GetSubmodules)
{
  if (info.Length() == 0 || !info[0]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  GetSubmodulesBaton* baton = new GetSubmodulesBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;
  baton->out = new std::vector<git_submodule *>;
  baton->repo = Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue();

  Nan::Callback *callback = new Nan::Callback(Local<Function>::Cast(info[0]));
  GetSubmodulesWorker *worker = new GetSubmodulesWorker(baton, callback);
  worker->SaveToPersistent("repo", info.This());
  Nan::AsyncQueueWorker(worker);
  return;
}

struct submodule_foreach_payload {
  git_repository *repo;
  std::vector<git_submodule *> *out;
};

int foreachSubmoduleCB(git_submodule *submodule, const char *name, void *void_payload) {
  submodule_foreach_payload *payload = (submodule_foreach_payload *)void_payload;
  git_submodule *out;

  int result = git_submodule_lookup(&out, payload->repo, name);
  if (result == GIT_OK) {
    payload->out->push_back(out);
  }

  return result;
}

void GitRepository::GetSubmodulesWorker::Execute()
{
  giterr_clear();

  LockMaster lockMaster(true, baton->repo);

  submodule_foreach_payload payload { baton->repo, baton->out };
  baton->error_code = git_submodule_foreach(baton->repo, foreachSubmoduleCB, (void *)&payload);

  if (baton->error_code != GIT_OK) {
    if (giterr_last() != NULL) {
      baton->error = git_error_dup(giterr_last());
    }

    while (baton->out->size()) {
      git_submodule_free(baton->out->back());
      baton->out->pop_back();
    }
    delete baton->out;
    baton->out = NULL;
  }
}

void GitRepository::GetSubmodulesWorker::HandleOKCallback()
{
  if (baton->out != NULL)
  {
    unsigned int size = baton->out->size();
    Local<Array> result = Nan::New<Array>(size);
    for (unsigned int i = 0; i < size; i++) {
      git_submodule *submodule = baton->out->at(i);
      Nan::Set(
        result,
        Nan::New<Number>(i),
        GitSubmodule::New(
          submodule,
          true,
          Nan::To<v8::Object>(GitRepository::New(git_submodule_owner(submodule), true)).ToLocalChecked()
        )
      );
    }

    delete baton->out;

    Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  }
  else if (baton->error)
  {
    Local<v8::Value> argv[1] = {
      Nan::Error(baton->error->message)
    };
    callback->Call(1, argv, async_resource);
    if (baton->error->message)
    {
      free((void *)baton->error->message);
    }

    free((void *)baton->error);
  }
  else if (baton->error_code < 0)
  {
    Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Repository getSubmodules has thrown an error.")).ToLocalChecked();
    Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
    Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.getSubmodules").ToLocalChecked());
    Local<v8::Value> argv[1] = {
      err
    };
    callback->Call(1, argv, async_resource);
  }
  else
  {
    callback->Call(0, NULL, async_resource);
  }
}

        NAN_METHOD(GitRepository::GetRemotes)
{
  if (info.Length() == 0 || !info[0]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  GetRemotesBaton* baton = new GetRemotesBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;
  baton->out = new std::vector<git_remote *>;
  baton->repo = Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue();

  Nan::Callback *callback = new Nan::Callback(Local<Function>::Cast(info[0]));
  GetRemotesWorker *worker = new GetRemotesWorker(baton, callback);
  worker->SaveToPersistent("repo", info.This());
  Nan::AsyncQueueWorker(worker);
  return;
}

void GitRepository::GetRemotesWorker::Execute()
{
  giterr_clear();

  git_repository *repo;
  {
    LockMaster lockMaster(true, baton->repo);
    baton->error_code = git_repository_open(&repo, git_repository_workdir(baton->repo));
  }

  if (baton->error_code != GIT_OK) {
    if (giterr_last() != NULL) {
      baton->error = git_error_dup(giterr_last());
    }
    delete baton->out;
    baton->out = NULL;
    return;
  }

  git_strarray remote_names;
  baton->error_code = git_remote_list(&remote_names, repo);

  if (baton->error_code != GIT_OK) {
    if (giterr_last() != NULL) {
      baton->error = git_error_dup(giterr_last());
    }
    delete baton->out;
    baton->out = NULL;
    return;
  }

  for (size_t remote_index = 0; remote_index < remote_names.count; ++remote_index) {
    git_remote *remote;
    baton->error_code = git_remote_lookup(&remote, repo, remote_names.strings[remote_index]);

    // stop execution and return if there is an error
    if (baton->error_code != GIT_OK) {
      if (giterr_last() != NULL) {
        baton->error = git_error_dup(giterr_last());
      }

      // unwind and return
      while (baton->out->size()) {
        git_remote *remoteToFree = baton->out->back();
        baton->out->pop_back();
        git_remote_free(remoteToFree);
      }

      git_strarray_free(&remote_names);
      git_repository_free(repo);
      delete baton->out;
      baton->out = NULL;
      return;
    }

    baton->out->push_back(remote);
  }
}

void GitRepository::GetRemotesWorker::HandleOKCallback()
{
  if (baton->out != NULL)
  {
    unsigned int size = baton->out->size();
    Local<Array> result = Nan::New<Array>(size);
    for (unsigned int i = 0; i < size; i++) {
      git_remote *remote = baton->out->at(i);
      Nan::Set(
        result,
        Nan::New<Number>(i),
        GitRemote::New(
          remote,
          true,
          Nan::To<v8::Object>(GitRepository::New(git_remote_owner(remote), true)).ToLocalChecked()
        )
      );
    }

    delete baton->out;

    Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  }
  else if (baton->error)
  {
    Local<v8::Value> argv[1] = {
      Nan::Error(baton->error->message)
    };
    callback->Call(1, argv, async_resource);
    if (baton->error->message)
    {
      free((void *)baton->error->message);
    }

    free((void *)baton->error);
  }
  else if (baton->error_code < 0)
  {
    Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Repository refreshRemotes has thrown an error.")).ToLocalChecked();
    Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
    Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.refreshRemotes").ToLocalChecked());
    Local<v8::Value> argv[1] = {
      err
    };
    callback->Call(1, argv, async_resource);
  }
  else
  {
    callback->Call(0, NULL, async_resource);
  }
}

        int getOidOfReferenceCommit(git_oid *commitOid, git_reference *ref) {
  git_object *commitObject;
  int result = git_reference_peel(&commitObject, ref, GIT_OBJ_COMMIT);

  if (result != GIT_OK) {
    return result;
  }

  git_oid_cpy(commitOid, git_object_id(commitObject));
  git_object_free(commitObject);
  return result;
}

int asDirectReference(git_reference **out, git_reference *ref) {
  if (git_reference_type(ref) != GIT_REF_SYMBOLIC) {
    return git_reference_dup(out, ref);
  }

  int error = git_reference_resolve(out, ref);
  if (error != GIT_OK) {
    *out = NULL;
  }

  return GIT_OK;
}

int lookupDirectReferenceByShorthand(git_reference **out, git_repository *repo, const char *shorthand) {
  git_reference *ref = NULL;
  int result = git_reference_dwim(&ref, repo, shorthand);

  if (result != GIT_OK) {
    return result;
  }

  result = asDirectReference(out, ref);
  git_reference_free(ref);
  return result;
}

int lookupDirectReferenceByFullName(git_reference **out, git_repository *repo, const char *fullName) {
  git_reference *ref = NULL;
  int result = git_reference_lookup(&ref, repo, fullName);

  if (result != GIT_OK) {
    return result;
  }

  result = asDirectReference(out, ref);
  git_reference_free(ref);
  return result;
}

char *getRemoteNameOfReference(git_reference *remoteReference) {
  return strtok(strdup(git_reference_shorthand(remoteReference)), "/");
}

bool gitStrArrayContains(git_strarray *strarray, const char *string) {
  for (size_t i = 0; i < strarray->count; ++i) {
    if (strcmp(strarray->strings[i], string) == 0) {
      return true;
    }
  }
  return false;
}

class RefreshedRefModel {
public:
  RefreshedRefModel(git_reference *ref):
    fullName(strdup(git_reference_name(ref))),
    message(NULL),
    sha(new char[GIT_OID_HEXSZ + 1]),
    shorthand(strdup(git_reference_shorthand(ref))),
    tagOdbBuffer(NULL),
    tagOdbBufferLength(0),
    type(NULL)
  {
    if (git_reference_is_branch(ref)) {
      type = "branch";
    } else if (git_reference_is_remote(ref)) {
      type = "remote";
    } else {
      type = "tag";
    }
  }

  static int fromReference(RefreshedRefModel **out, git_reference *ref, git_odb *odb) {
    RefreshedRefModel *refModel = new RefreshedRefModel(ref);
    const git_oid *referencedTargetOid = git_reference_target(ref);

    if (!git_reference_is_tag(ref)) {
      git_oid_tostr(refModel->sha, GIT_OID_HEXSZ + 1, referencedTargetOid);

      *out = refModel;
      return GIT_OK;
    }
    git_repository *repo = git_reference_owner(ref);

    git_tag *referencedTag;
    if (git_tag_lookup(&referencedTag, repo, referencedTargetOid) == GIT_OK) {
      refModel->message = strdup(git_tag_message(referencedTag));

      git_odb_object *tagOdbObject;
      if (git_odb_read(&tagOdbObject, odb, git_tag_id(referencedTag)) == GIT_OK) {
        refModel->tagOdbBufferLength = git_odb_object_size(tagOdbObject);
        refModel->tagOdbBuffer = new char[refModel->tagOdbBufferLength];
        std::memcpy(refModel->tagOdbBuffer, git_odb_object_data(tagOdbObject), refModel->tagOdbBufferLength);
        git_odb_object_free(tagOdbObject);
      }

      git_tag_free(referencedTag);
    }

    git_oid peeledReferencedTargetOid;
    int error = getOidOfReferenceCommit(&peeledReferencedTargetOid, ref);
    if (error != GIT_OK) {
      delete refModel;
      return error;
    }

    git_oid_tostr(refModel->sha, GIT_OID_HEXSZ + 1, &peeledReferencedTargetOid);

    *out = refModel;
    return GIT_OK;
  }

  static void ensureSignatureRegexes() {
    if (!signatureRegexesBySignatureType.IsEmpty()) {
      return;
    }

    v8::Local<v8::Array> gpgsigArray = Nan::New<v8::Array>(2),
      x509Array = Nan::New<v8::Array>(1);

    Nan::Set(
      gpgsigArray,
      Nan::New<Number>(0),
      Nan::New<v8::RegExp>(
        Nan::New("-----BEGIN PGP SIGNATURE-----[\\s\\S]+?-----END PGP SIGNATURE-----").ToLocalChecked(),
        static_cast<v8::RegExp::Flags>(v8::RegExp::Flags::kGlobal | v8::RegExp::Flags::kMultiline)
      ).ToLocalChecked()
    );

    Nan::Set(
      gpgsigArray,
      Nan::New<Number>(1),
      Nan::New<v8::RegExp>(
        Nan::New("-----BEGIN PGP MESSAGE-----[\\s\\S]+?-----END PGP MESSAGE-----").ToLocalChecked(),
        static_cast<v8::RegExp::Flags>(v8::RegExp::Flags::kGlobal | v8::RegExp::Flags::kMultiline)
      ).ToLocalChecked()
    );

    Nan::Set(
      x509Array,
      Nan::New<Number>(0),
      Nan::New<v8::RegExp>(
        Nan::New("-----BEGIN SIGNED MESSAGE-----[\\s\\S]+?-----END SIGNED MESSAGE-----").ToLocalChecked(),
        static_cast<v8::RegExp::Flags>(v8::RegExp::Flags::kGlobal | v8::RegExp::Flags::kMultiline)
      ).ToLocalChecked()
    );

    v8::Local<v8::Object> result = Nan::New<Object>();
    Nan::Set(result, Nan::New("gpgsig").ToLocalChecked(), gpgsigArray);
    Nan::Set(result, Nan::New("x509").ToLocalChecked(), x509Array);

    signatureRegexesBySignatureType.Reset(result);
  }

  v8::Local<v8::Object> toJavascript(v8::Local<v8::String> signatureType) {
    v8::Local<v8::Object> result = Nan::New<Object>();

    v8::Local<v8::Value> jsFullName;
    if (fullName == NULL) {
      jsFullName = Nan::Null();
    } else {
      jsFullName = Nan::New<String>(fullName).ToLocalChecked();
    }
    Nan::Set(result, Nan::New("fullName").ToLocalChecked(), jsFullName);

    v8::Local<v8::Value> jsMessage;
    if (message == NULL) {
      jsMessage = Nan::Null();
    } else {
      jsMessage = Nan::New<String>(message).ToLocalChecked();
    }
    Nan::Set(result, Nan::New("message").ToLocalChecked(), jsMessage);

    Nan::Set(
      result,
      Nan::New("sha").ToLocalChecked(),
      Nan::New<String>(sha).ToLocalChecked()
    );

    v8::Local<v8::Value> jsShorthand;
    if (shorthand == NULL) {
      jsShorthand = Nan::Null();
    } else {
      jsShorthand = Nan::New<String>(shorthand).ToLocalChecked();
    }
    Nan::Set(result, Nan::New("shorthand").ToLocalChecked(), jsShorthand);

    v8::Local<v8::Value> jsTagSignature = Nan::Null();
    if (tagOdbBuffer != NULL && tagOdbBufferLength != 0) {
      // tagOdbBuffer is already a copy, so we'd like to use NewBuffer instead,
      // but we were getting segfaults and couldn't easily figure out why. :(
      // We tried passing the tagOdbBuffer directly to NewBuffer and then nullifying tagOdbBuffer so that
      // the destructor didn't double free, but that still segfaulted internally in Node.
      v8::Local<v8::Object> buffer = Nan::CopyBuffer(tagOdbBuffer, tagOdbBufferLength).ToLocalChecked();
      v8::Local<v8::Value> toStringProp = Nan::Get(buffer, Nan::New("toString").ToLocalChecked()).ToLocalChecked();
      v8::Local<v8::Object> jsTagOdbObjectString = Nan::To<v8::Object>(Nan::CallAsFunction(Nan::To<v8::Object>(toStringProp).ToLocalChecked(), buffer, 0, NULL).ToLocalChecked()).ToLocalChecked();

      v8::Local<v8::Object> _signatureRegexesBySignatureType = Nan::New(signatureRegexesBySignatureType);
      v8::Local<v8::Array> signatureRegexes = v8::Local<v8::Array>::Cast(Nan::Get(_signatureRegexesBySignatureType, signatureType).ToLocalChecked());

      for (uint32_t i = 0; i < signatureRegexes->Length(); ++i) {
        v8::Local<v8::Value> argv[] = {
          Nan::Get(signatureRegexes, Nan::New(i)).ToLocalChecked()
        };

        v8::Local<v8::Value> matchProp = Nan::Get(jsTagOdbObjectString, Nan::New("match").ToLocalChecked()).ToLocalChecked();
        v8::Local<v8::Value> match = Nan::CallAsFunction(Nan::To<v8::Object>(matchProp).ToLocalChecked(), jsTagOdbObjectString, 1, argv).ToLocalChecked();
        if (match->IsArray()) {
          jsTagSignature = Nan::Get(Nan::To<v8::Object>(match).ToLocalChecked(), 0).ToLocalChecked();
          break;
        }
      }
    }
    Nan::Set(result, Nan::New("tagSignature").ToLocalChecked(), jsTagSignature);

    v8::Local<v8::Value> jsType;
    if (type == NULL) {
      jsType = Nan::Null();
    } else {
      jsType = Nan::New<String>(type).ToLocalChecked();
    }
    Nan::Set(result, Nan::New("type").ToLocalChecked(), jsType);

    return result;
  }

  ~RefreshedRefModel() {
    if (fullName != NULL) { delete[] fullName; }
    if (message != NULL) { delete[] message; }
    delete[] sha;
    if (shorthand != NULL) { delete[] shorthand; }
    if (tagOdbBuffer != NULL) { delete[] tagOdbBuffer; }
  }

  char *fullName, *message, *sha, *shorthand, *tagOdbBuffer;
  size_t tagOdbBufferLength;
  const char *type;
  static Nan::Persistent<v8::Object> signatureRegexesBySignatureType;
};

Nan::Persistent<v8::Object> RefreshedRefModel::signatureRegexesBySignatureType;

class UpstreamModel {
public:
  UpstreamModel(const char *inputDownstreamFullName, const char *inputUpstreamFullName):
    downstreamFullName((char *)strdup(inputDownstreamFullName)),
    upstreamFullName((char *)strdup(inputUpstreamFullName)),
    ahead(0),
    behind(0) {}

  static bool fromReference(UpstreamModel **out, git_reference *ref) {
    if (!git_reference_is_branch(ref)) {
      return false;
    }

    git_reference *upstream;
    int result = git_branch_upstream(&upstream, ref);
    if (result != GIT_OK) {
      return false;
    }

    UpstreamModel *upstreamModel = new UpstreamModel(
      git_reference_name(ref),
      git_reference_name(upstream)
    );

    git_oid localCommitOid;
    result = getOidOfReferenceCommit(&localCommitOid, ref);
    if (result != GIT_OK) {
      delete upstreamModel;
      return false;
    }

    git_oid upstreamCommitOid;
    result = getOidOfReferenceCommit(&upstreamCommitOid, upstream);
    if (result != GIT_OK) {
      delete upstreamModel;
      return false;
    }

    result = git_graph_ahead_behind(
      &upstreamModel->ahead,
      &upstreamModel->behind,
      git_reference_owner(ref),
      &localCommitOid,
      &upstreamCommitOid
    );

    if (result != GIT_OK) {
      delete upstreamModel;
      return false;
    }

    *out = upstreamModel;
    return true;
  }

  v8::Local<v8::Object> toJavascript() {
    v8::Local<v8::Object> result = Nan::New<Object>();

    v8::Local<v8::Value> jsDownstreamFullName;
    if (downstreamFullName == NULL) {
      jsDownstreamFullName = Nan::Null();
    } else {
      jsDownstreamFullName = Nan::New<String>(downstreamFullName).ToLocalChecked();
    }
    Nan::Set(result, Nan::New("downstreamFullName").ToLocalChecked(), jsDownstreamFullName);

    v8::Local<v8::Value> jsUpstreamFullName;
    if (upstreamFullName == NULL) {
      jsUpstreamFullName = Nan::Null();
    } else {
      jsUpstreamFullName = Nan::New<String>(upstreamFullName).ToLocalChecked();
    }
    Nan::Set(result, Nan::New("upstreamFullName").ToLocalChecked(), jsUpstreamFullName);

    Nan::Set(result, Nan::New("ahead").ToLocalChecked(), Nan::New<Number>(ahead));
    Nan::Set(result, Nan::New("behind").ToLocalChecked(), Nan::New<Number>(behind));
    return result;
  }

  ~UpstreamModel() {
    if (downstreamFullName != NULL) { delete[] downstreamFullName; }
    if (upstreamFullName != NULL) { delete[] upstreamFullName; }
  }

  char *downstreamFullName;
  char *upstreamFullName;
  size_t ahead;
  size_t behind;
};

class RefreshReferencesData {
public:
  RefreshReferencesData():
    headRefFullName(NULL),
    cherrypick(NULL),
    merge(NULL) {}

  ~RefreshReferencesData() {
    while(refs.size()) {
      delete refs.back();
      refs.pop_back();
    }
    while(upstreamInfo.size()) {
      delete upstreamInfo.back();
      upstreamInfo.pop_back();
    }
    if (headRefFullName != NULL) { delete[] headRefFullName; }
    if (cherrypick != NULL) { delete cherrypick; }
    if (merge != NULL) { delete merge; }
  }

  std::vector<RefreshedRefModel *> refs;
  std::vector<UpstreamModel *> upstreamInfo;
  char *headRefFullName;
  RefreshedRefModel *cherrypick;
  RefreshedRefModel *merge;
};

NAN_METHOD(GitRepository::RefreshReferences)
{
  v8::Local<v8::String> signatureType;
  if (info.Length() == 2) {
    if (!info[0]->IsString()) {
      return Nan::ThrowError("Signature type must be \"gpgsig\" or \"x509\".");
    }

    v8::Local<v8::String> signatureTypeParam = Nan::To<v8::String>(info[0]).ToLocalChecked();
    if (
      Nan::Equals(signatureTypeParam, Nan::New("gpgsig").ToLocalChecked()) != Nan::Just(true)
      && Nan::Equals(signatureTypeParam, Nan::New("x509").ToLocalChecked()) != Nan::Just(true)
    ) {
      return Nan::ThrowError("Signature type must be \"gpgsig\" or \"x509\".");
    }
    signatureType = signatureTypeParam;
  } else {
    signatureType = Nan::New("gpgsig").ToLocalChecked();
  }

  if (info.Length() == 0 || (info.Length() == 1 && !info[0]->IsFunction()) || (info.Length() == 2 && !info[1]->IsFunction())) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  RefreshReferencesBaton* baton = new RefreshReferencesBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;
  baton->out = (void *)new RefreshReferencesData;
  baton->repo = Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue();

  Nan::Callback *callback = new Nan::Callback(Local<Function>::Cast(info[0]));
  RefreshReferencesWorker *worker = new RefreshReferencesWorker(baton, callback);
  worker->SaveToPersistent("repo", info.This());
  worker->SaveToPersistent("signatureType", signatureType);
  Nan::AsyncQueueWorker(worker);
  return;
}

void GitRepository::RefreshReferencesWorker::Execute()
{
  giterr_clear();

  LockMaster lockMaster(true, baton->repo);
  git_repository *repo = baton->repo;
  RefreshReferencesData *refreshData = (RefreshReferencesData *)baton->out;
  git_odb *odb;

  baton->error_code = git_repository_odb(&odb, repo);
  if (baton->error_code != GIT_OK) {
    if (giterr_last() != NULL) {
      baton->error = git_error_dup(giterr_last());
    }
    delete refreshData;
    baton->out = NULL;
    return;
  }

  // START Refresh HEAD
  git_reference *headRef = NULL;
  baton->error_code = lookupDirectReferenceByShorthand(&headRef, repo, "HEAD");

  if (baton->error_code != GIT_OK || headRef == NULL) {
    if (giterr_last() != NULL) {
      baton->error = git_error_dup(giterr_last());
    }
    git_odb_free(odb);
    delete refreshData;
    baton->out = NULL;
    return;
  }

  RefreshedRefModel *headModel;
  baton->error_code = RefreshedRefModel::fromReference(&headModel, headRef, odb);
  if (baton->error_code != GIT_OK) {
    if (giterr_last() != NULL) {
      baton->error = git_error_dup(giterr_last());
    }
    git_odb_free(odb);
    git_reference_free(headRef);
    delete refreshData;
    baton->out = NULL;
    return;
  }
  refreshData->refs.push_back(headModel);

  refreshData->headRefFullName = strdup(git_reference_name(headRef));
  git_reference_free(headRef);
  // END Refresh HEAD

  // START Refresh CHERRY_PICK_HEAD
  git_reference *cherrypickRef = NULL;
  if (lookupDirectReferenceByShorthand(&cherrypickRef, repo, "CHERRY_PICK_HEAD") == GIT_OK && cherrypickRef != NULL) {
    baton->error_code = RefreshedRefModel::fromReference(&refreshData->cherrypick, cherrypickRef, odb);
    git_reference_free(cherrypickRef);
  } else {
    cherrypickRef = NULL;
  }
  // END Refresh CHERRY_PICK_HEAD

  // START Refresh MERGE_HEAD
  git_reference *mergeRef = NULL;
  // fall through if cherry pick failed
  if (baton->error_code == GIT_OK && lookupDirectReferenceByShorthand(&mergeRef, repo, "MERGE_HEAD") == GIT_OK && mergeRef != NULL) {
    baton->error_code = RefreshedRefModel::fromReference(&refreshData->merge, mergeRef, odb);
    git_reference_free(mergeRef);
  } else {
    mergeRef = NULL;
  }
  // END Refresh MERGE_HEAD

  if (baton->error_code != GIT_OK) {
    if (giterr_last() != NULL) {
      baton->error = git_error_dup(giterr_last());
    }
    git_odb_free(odb);
    delete refreshData;
    baton->out = NULL;
    return;
  }

  // Retrieve reference models and upstream info for each reference
  git_strarray referenceNames;
  baton->error_code = git_reference_list(&referenceNames, repo);

  if (baton->error_code != GIT_OK) {
    if (giterr_last() != NULL) {
      baton->error = git_error_dup(giterr_last());
    }
    git_odb_free(odb);
    delete refreshData;
    baton->out = NULL;
    return;
  }

  git_strarray remoteNames;
  baton->error_code = git_remote_list(&remoteNames, repo);

  if (baton->error_code != GIT_OK) {
    if (giterr_last() != NULL) {
      baton->error = git_error_dup(giterr_last());
    }
    git_odb_free(odb);
    git_strarray_free(&referenceNames);
    delete refreshData;
    baton->out = NULL;
    return;
  }

  for (size_t referenceIndex = 0; referenceIndex < referenceNames.count; ++referenceIndex) {
    git_reference *reference;
    baton->error_code = lookupDirectReferenceByFullName(&reference, repo, referenceNames.strings[referenceIndex]);

    if (baton->error_code != GIT_OK) {
      break;
    }
    if (reference == NULL) {
      // lookup found the reference but failed to resolve it directly
      continue;
    }

    UpstreamModel *upstreamModel;
    if (UpstreamModel::fromReference(&upstreamModel, reference)) {
      refreshData->upstreamInfo.push_back(upstreamModel);
    }

    bool isBranch = git_reference_is_branch(reference);
    bool isRemote = git_reference_is_remote(reference);
    bool isTag = git_reference_is_tag(reference);
    if (
      strcmp(referenceNames.strings[referenceIndex], headModel->fullName) == 0
      || (!isBranch && !isRemote && !isTag)
    ) {
      git_reference_free(reference);
      continue;
    }

    if (isRemote) {
      char *remoteNameOfRef = getRemoteNameOfReference(reference);
      bool isFromExistingRemote = gitStrArrayContains(&remoteNames, remoteNameOfRef);
      delete[] remoteNameOfRef;
      if (!isFromExistingRemote) {
        git_reference_free(reference);
        continue;
      }
    }

    RefreshedRefModel *refreshedRefModel;
    baton->error_code = RefreshedRefModel::fromReference(&refreshedRefModel, reference, odb);
    git_reference_free(reference);

    if (baton->error_code == GIT_OK) {
      refreshData->refs.push_back(refreshedRefModel);
    } else {
      baton->error_code = GIT_OK;
    }
  }

  git_odb_free(odb);
  git_strarray_free(&remoteNames);
  git_strarray_free(&referenceNames);

  if (baton->error_code != GIT_OK) {
    if (giterr_last() != NULL) {
      baton->error = git_error_dup(giterr_last());
    }
    delete refreshData;
    baton->out = NULL;
    return;
  }
}

void GitRepository::RefreshReferencesWorker::HandleOKCallback()
{
  if (baton->out != NULL)
  {
    RefreshedRefModel::ensureSignatureRegexes();
    RefreshReferencesData *refreshData = (RefreshReferencesData *)baton->out;
    v8::Local<v8::Object> result = Nan::New<Object>();

    Nan::Set(
      result,
      Nan::New("headRefFullName").ToLocalChecked(),
      Nan::New<String>(refreshData->headRefFullName).ToLocalChecked()
    );

    v8::Local<v8::String> signatureType = Nan::To<v8::String>(GetFromPersistent("signatureType")).ToLocalChecked();

    unsigned int numRefs = refreshData->refs.size();
    v8::Local<v8::Array> refs = Nan::New<v8::Array>(numRefs);
    for (unsigned int i = 0; i < numRefs; ++i) {
      RefreshedRefModel *refreshedRefModel = refreshData->refs[i];
      Nan::Set(refs, Nan::New(i), refreshedRefModel->toJavascript(signatureType));
    }
    Nan::Set(result, Nan::New("refs").ToLocalChecked(), refs);

    unsigned int numUpstreamInfo = refreshData->upstreamInfo.size();
    v8::Local<v8::Array> upstreamInfo = Nan::New<v8::Array>(numUpstreamInfo);
    for (unsigned int i = 0; i < numUpstreamInfo; ++i) {
      UpstreamModel *upstreamModel = refreshData->upstreamInfo[i];
      Nan::Set(upstreamInfo, Nan::New(i), upstreamModel->toJavascript());
    }
    Nan::Set(result, Nan::New("upstreamInfo").ToLocalChecked(), upstreamInfo);

    if (refreshData->cherrypick != NULL) {
      Nan::Set(
        result,
        Nan::New("cherrypick").ToLocalChecked(),
        refreshData->cherrypick->toJavascript(signatureType)
      );
    } else {
      Nan::Set(result, Nan::New("cherrypick").ToLocalChecked(), Nan::Null());
    }

    if (refreshData->merge != NULL) {
      Nan::Set(
        result,
        Nan::New("merge").ToLocalChecked(),
        refreshData->merge->toJavascript(signatureType)
      );
    } else {
      Nan::Set(result, Nan::New("merge").ToLocalChecked(), Nan::Null());
    }

    delete refreshData;

    Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  }
  else if (baton->error)
  {
    Local<v8::Value> argv[1] = {
      Nan::Error(baton->error->message)
    };
    callback->Call(1, argv, async_resource);
    if (baton->error->message)
    {
      free((void *)baton->error->message);
    }

    free((void *)baton->error);
  }
  else if (baton->error_code < 0)
  {
    Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Repository refreshReferences has thrown an error.")).ToLocalChecked();
    Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
    Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Repository.refreshReferences").ToLocalChecked());
    Local<v8::Value> argv[1] = {
      err
    };
    callback->Call(1, argv, async_resource);
  }
  else
  {
    callback->Call(0, NULL, async_resource);
  }
}

   
/*
   * @param Index index
     */
NAN_METHOD(GitRepository::SetIndex) {
  Nan::EscapableHandleScope scope;

// start convert_from_v8 block
  git_index * from_index = NULL;
    if (info[0]->IsObject()) {
from_index = Nan::ObjectWrap::Unwrap<GitIndex>(Nan::To<v8::Object>(info[0]).ToLocalChecked())->GetValue();
  }
  else {
    from_index = 0;
  }
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
            ,
              from_index
    );

    git_repository_set_index(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
,          from_index
    );

      return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
  }
}
   
/*
     */
NAN_METHOD(GitRepository::SubmoduleCacheAll) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

 int result =     git_repository_submodule_cache_all(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

      if (result != GIT_OK) {

        if (git_error_last()) {
          return Nan::ThrowError(git_error_last()->message);
        } else {
          return Nan::ThrowError("Unknown Error");
        }
      } // lock master scope end
      return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
  }
}
   
/*
     */
NAN_METHOD(GitRepository::SubmoduleCacheClear) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

 int result =     git_repository_submodule_cache_clear(
          Nan::ObjectWrap::Unwrap<GitRepository>(info.This())->GetValue()
    );

      if (result != GIT_OK) {

        if (git_error_last()) {
          return Nan::ThrowError(git_error_last()->message);
        } else {
          return Nan::ThrowError("Unknown Error");
        }
      } // lock master scope end
      return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
  }
}
    // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitRepositoryTraits>;
 